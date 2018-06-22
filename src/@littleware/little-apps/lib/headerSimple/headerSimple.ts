import { html, render } from '../../../../lit-html/lit-html.js';
import { css } from './headerSimple.css.js';
import {singleton as styleHelper} from '../../../little-elements/lib/styleGuide/styleGuide.js';
import './googleAnalytics.js';

function templateFactory(header:SimpleHeader) {
  const titleStr = (this.getAttribute('title') || 'Home').replace( /[<>\r\n]+/g, "" );
  return html`
  <table class="lw-header">
        <tr>
            <td class="lw-header__nav">
                <a href="/" class="pure-menu-link"><i class="fa fa-home fa-2x"></i></a>
            </td>
            <td class="lw-header__title">
                ${titleStr}
            </td>
        </tr>
    </table>
  `;
}

/**
 * SimpleHeader custom element - just has a nav "home" button, and a title
 */
export class SimpleHeader extends HTMLElement {
    // Can define constructor arguments if you wish.
    constructor() {
      // If you define a ctor, always call super() first!
      // This is specific to CE and required by the spec.
      super();
    }

    /**
     *  Monitor the 'name' attribute for changes, see:
     *     https://developer.mozilla.org/en-US/docs/Web/Web_Components/Custom_Elements
     */
    static get observedAttributes():Array<string> { return ['title']; }

    connectedCallback(): void {
    }

    disconnectedCallback(): void {
    }

    attributeChangedCallback(attrName?: string, oldVal?: string, newVal?: string): void {
      //console.log( "Attribute change! " + attrName );
      this._render();
    }

    adoptedCallback(): void {

    }

    /**
     * Rebuild the path elements under the arrpie-pielist group
     * Note: only public to fascilitate testing
     */
    _render():void {
      render( templateFactory(this), this );
    }
}

window.customElements.define( "lw-header-simple", SimpleHeader );
styleHelper.componentCss.push(css);
styleHelper.render();
