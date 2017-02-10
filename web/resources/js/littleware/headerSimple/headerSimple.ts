namespace littleware {
  export namespace headerSimple {

    /**
     * SimpleHeader custom element - just has a nav "home" button, and a title
     */
    export class SimpleHeader extends HTMLElement {
        private _initialized:boolean;

        // Can define constructor arguments if you wish.
        constructor() {
          // If you define a ctor, always call super() first!
          // This is specific to CE and required by the spec.
          super();

          // Note - constructor must return element without children
          //   for document.createElement to work properly'
          this._initialized = false;
        }

        /**
         *  Monitor the 'name' attribute for changes, see:
         *     https://developer.mozilla.org/en-US/docs/Web/Web_Components/Custom_Elements
         */
        static get observedAttributes():Array<string> { return ['title']; }

        connectedCallback(): void {
          this._init();
        }

        disconnectedCallback(): void {
        }

        attributeChangedCallback(attrName?: string, oldVal?: string, newVal?: string): void {
          //console.log( "Attribute change! " + attrName );
          this._render();
        }

        adoptedCallback(): void {

        }

        private _init():void {
            if ( this._initialized ) {
              return;
            }
            let template = document.querySelector( 'template[id="lw-header-simple-top"]' ) as HTMLTemplateElement;
            if ( ! template ) {
              throw new Error( "SimpleHeader template not loaded: lw-header-simple-top" );
            }
            let clone = document.importNode( template.content, true );
            //this.innerHTML = "<div><h3>Hello from SimpleHeader!</h3></div>";
            this.appendChild( clone );
            this._initialized = true;
        }

        /**
         * Rebuild the path elements under the arrpie-pielist group
         * Note: only public to fascilitate testing
         */
        _render():void {
          this._init();
          let titleNode = this.querySelector( "td.lw-header__title" );
          if ( titleNode ) {
            titleNode.textContent = (this.getAttribute( 'title' ) || "").replace( /[<>\r\n]+/g, "" );
          } else {
            console.log( "??? header title node missing ???" );
          }
        }

    }

    window.customElements.define( "lw-header-simple", SimpleHeader );

    
}}