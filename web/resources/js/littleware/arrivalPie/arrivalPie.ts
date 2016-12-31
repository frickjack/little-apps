module littleware.arrivalPie {

export interface CustomeElements {
    define( tagName:string, elementClass:any ):void;
}

declare var customElements: CustomeElements;

customElements.define( "lw-arrival-pie", 
        
    /**
     * ArrivalPie custom element
     */
    class ArrivalPie extends HTMLElement {
        // Can define constructor arguments if you wish.
        constructor() {
          // If you define a ctor, always call super() first!
          // This is specific to CE and required by the spec.
          super();

          /*
          // Setup a click listener on <app-drawer> itself.
          this.addEventListener('click', e => {
            // Don't toggle the drawer if it's disabled.
            if (this.disabled) {
              return;
            }
            this.toggleDrawer();
          });
          */
          let template = document.querySelector( 'template[id="lw-arrival-pie-top"]' ) as HTMLTemplateElement;
          if ( ! template ) {
            throw new Error( "ArrivalPie template not loaded: lw-arrival-pie-top" );
          }
          let clone = document.importNode( template.content, true );
          //this.innerHTML = "<div><h3>Hello from ArrivalPie!</h3></div>";
          this.appendChild( clone );
        }

        onnectedCallback(): void {
        }

        disconnectedCallback(): void {
        }

        attributeChangedCallback(attrName?: string, oldVal?: string, newVal?: string): void {
        }

        adoptedCallback(): void {

        }

        addPath(): void {
          let namespace = this.querySelector( "svg" ).namespaceURI;
          let path = document.createElementNS( namespace, "path" );
          // ...
        }

        
        // A getter/setter for an open property.
        get open() {
          return this.hasAttribute('open');
        }

        set open(val) {
          // Reflect the value of the open property as an HTML attribute.
          if (val) {
            this.setAttribute('open', '');
          } else {
            this.removeAttribute('open');
          }
          this.toggleDrawer();
        }

        // A getter/setter for a disabled property.
        get disabled() {
          return this.hasAttribute('disabled');
        }

        set disabled(val) {
          // Reflect the value of the disabled property as an HTML attribute.
          if (val) {
            this.setAttribute('disabled', '');
          } else {
            this.removeAttribute('disabled');
          }
        }

        
        toggleDrawer() {
          //...
        }
    }
);


}