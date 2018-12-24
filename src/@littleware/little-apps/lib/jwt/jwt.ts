import { html, render } from '../../../../lit-html/lit-html.js';
import '../../../little-elements/lib/arrivalPie/arrivalPie.js';
import {singleton as styleHelper} from '../../../little-elements/lib/styleGuide/styleGuide.js';
import {css} from './jwt.css.js';


/**
 * Dumb bucket collecting a token
 * and its parsed components
 */
export class JwtData {
    private _token:string = "";
    private _header = "";
    private _body = "";
    private _signature = "";
    private _isValid = false;
    private _errorStr = "uninitalized";

    constructor(token, header, body, signature, isValid, errorStr) {
        this._token = token;
        this._header = header;
        this._body = body;
        this._signature = signature;
        this._isValid = isValid;
        this._errorStr = isValid ? "" : errorStr;
    }
    get token(): string { return this._token; }
    get header(): string { return this._header; }
    get body(): string { return this._body; }
    get signature(): string { return this._signature; }
    get isValid(): boolean { return this._isValid; }
    get errorStr(): string { return this._errorStr; }
}

/**
 * Not suitable for encrypted tokens
 * @param token 
 */
export function parseSignedJwt(token:string):JwtData {
    if (!token) {
        return new JwtData("", "", "", "", false, "empty token")
    }
    const parts = token.split('.').map((str,idx) => idx < 2 ? atob(str.replace('-', '+').replace('_', '/')) : str);
    if (parts.length != 3) {
        return new JwtData(token, "", "", "", false, "invalid format - expect 'header.body.signature'");
    }
    try {
        return new JwtData(
          token,
          JSON.stringify(JSON.parse(parts[0]), null, ' '), 
          JSON.stringify(JSON.parse(parts[1]), null, ' '),
          parts[2],
          true,
          ""
          );
    } catch (err) {
        return new JwtData(
            token, parts[0], parts[1], parts[2], false, "failed to JSON parse body or header"
        );
    }
}

export function emptyJwt():JwtData {
    return parseSignedJwt("");
}


function templateFactory(data:JwtData) {
    const template = html`
<div class="lw-jwt-container">
  <div class="lw-jwt-token">
  Paste a token here
  <pre class="lw-jwt-paste-target">
${data.token.substring(0,5) + (data.token.length > 10 ? "..." + data.token.slice(-5) : "")}
  </pre>
  </div>
  <div class="lw-jwt-header">
  <b>Header</b>
  <pre class="lw-jwt-code">
${data.isValid ? data.header : ""}
  </pre></div>
  <div class="lw-jwt-${data.isValid ? "body" : "error"}">
  <b>Body</b>
  <pre class="lw-jwt-code">
${data.isValid ? data.body : data.errorStr}
  </pre></div>
  <div class="lw-jwt-signature">
  <b>Signature</b>
  <div class="lw-jwt-code">
  ${data.isValid ? data.signature : ""}
  </div>
  </div>
</div>
    `;
    return template;
}

/**
 * Interaction manager for the JWT view
 */
export class Controller {
    private view:LittleJwt;
    private _data:JwtData;
    private isConnected = false;
    private pasteEventListener = (ev:ClipboardEvent) => {
        const token = ev.clipboardData.getData('text');
        ev.preventDefault();
        this.data = parseSignedJwt(token);
    };

    get data() { return this._data; }
    set data(value:JwtData) {
        this._data = value;
        this.view._render();
    }

    constructor(view:LittleJwt, data:JwtData) {
        this.view = view;
        this.data = data; 
    }


    /**
     * Register event listeners
     */
    connect() {
        if (!this.isConnected) {
            this.view.addEventListener('paste',
                this.pasteEventListener 
            );
        }
    }

    /**
     * Disconnect event listeners
     */
    disconnect() {
        if (this.isConnected) {
            this.view.removeEventListener('paste', this.pasteEventListener);
            this.isConnected = false;
        }
    }
}


/**
 * JWT parser custom element
 */
export class LittleJwt extends HTMLElement {
    controller:Controller = null;
    private isRenderPending = false;

    // Can define constructor arguments if you wish.
    constructor() {
        // If you define a constructor, then always call super() first!
        // This is specific to CE and required by the spec.
        super();
        this.controller = new Controller(this, emptyJwt());
    }

    //static get observedAttributes():Array<string> { return ['title']; }

    connectedCallback(): void {
        this._render();
        this.controller.connect();
    }

    disconnectedCallback(): void {
        this.controller.disconnect();
    }

    get data() { return this.controller.data; }
    get token() { return this.controller.data.token; }
    set token(str) { this.controller.data = parseSignedJwt(str); }

    attributeChangedCallback(attrName?: string, oldVal?: string, newVal?: string): void {
        //console.log( "Attribute change! " + attrName );
        //this._render();
    }

    adoptedCallback(): void {}

    /**
     * Schedule async render if not already scheduled ...
     */
    _render():void {
        if (!this.isRenderPending) {
            this.isRenderPending=true;
            // TODO - setup external render manager to manage multi-component renders
            setTimeout(() => {
                this.isRenderPending = false; 
                render(templateFactory(this.data), this); 
            });
        }
    }
}

window.customElements.define('lw-jwt', LittleJwt);

styleHelper.componentCss.push(css);
styleHelper.render();
