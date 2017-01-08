interface Arrival {
  startAngle: number;
  durationDegrees: number;
}

export function arrivalListToString( arrivalList:Array<Arrival> ):string {
  return arrivalList.map(
    (arr) => { return "" + arr.startAngle + "," + arr.durationDegrees + ";"; }
  ).reduce(
    (acc,s) => { return acc + s; }, ""
  );
}

export function stringToArrivalList( arrivalListStr:string ):Array<Arrival> {
  let clean = arrivalListStr.replace( /\s+/g, "" );
  return clean.split( ";" ).map( (part) => {
    return part.split( "," ).map( (s) => Number(s) );
  }).filter( (tuple) => { 
    return tuple.length === 2 && (! isNaN(tuple[0])) && (! isNaN(tuple[1])); 
  }).map( (tuple) => {
    return { startAngle: tuple[0], durationDegrees:tuple[1] }; 
  });

}

window.customElements.define( "lw-arrival-pie", 
        
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

        
        connectedCallback(): void {
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

        
        get arrivalList():Array<Arrival> {
          var result = [];
          return stringToArrivalList( this.getAttribute( "arrivalList" ) );
        }

        set arrivalList( val:Array<Arrival> ) {
          this.setAttribute( "arrivalList", arrivalListToString( val ) );
        }

       
    }
);
