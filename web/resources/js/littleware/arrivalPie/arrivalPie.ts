module littleware.arrivalPie {
    
/**
 * ArrivalPie custom element
 */
class ArrivalPie extends HTMLElement {
}

export interface CustomeElements {
    define( tagName:string, elementClass:any ):void;
}

declare var customElements: CustomeElements;

customElements.define( "arrival-pie", ArrivalPie );

}