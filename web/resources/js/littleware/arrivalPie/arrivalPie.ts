namespace littleware {
  export namespace arrivalPie {

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
              if ( attrName === "arrivalList" ) {
                // for now - just go ahead and re-render - TODO implement undirectional arch with dirty/whatever
                this._renderPie( newVal );
              }
            }

            adoptedCallback(): void {

            }

            /**
             * Rebuild the path elements under the arrpie-pielist group
             */
            private _renderPie( arrivalListSpec:string ) {
              let g = this.querySelector( "g.arrpie-pielist" );
              // remove all current paths
              while( g.hasChildNodes() ) {
                g.removeChild( g.lastChild );
              }
              this.arrivalList.forEach(
                (arr) => {
                  g.appendChild( this._buildPath(arr) );
                }
              );
            }


            /**
             * Build the SVGPath that visually represents the given arrival data
             * 
             * @param data
             * @return SVGPathElement 
             */
            private _buildPath( data:Arrival ): SVGPathElement {
              //let namespace = this.querySelector( "svg" ).namespaceURI;
              //let path = document.createElementNS( namespace, "path" );
              let path = new SVGPathElement();
              //<path class="arrpie-pie" style="fill:green; stroke:red;stroke-width:2" d="M50,50 L50,5 A45,45 0 0,1 95,50 z"></path>
              path.setAttribute( "class", "arrival-pie" );
              if ( data.durationDegrees > 90 ) {
                throw new Error( "Obtuse angles not yet supported" );
              }
              let x = 45 * Math.cos( data.durationDegrees ) + 50; // r * cos(theta)
              let y = 45 * Math.sin( data.durationDegrees ) + 50; // r * sin( theta )
              path.setAttribute( "d", "M50,50 L50,5 A45,45 0 0,1 " + x + "," + y + " z" );
              path.setAttribute( "transform", "rotate( " + data.startAngle + " 50 50 )" );
              return path;
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
}}