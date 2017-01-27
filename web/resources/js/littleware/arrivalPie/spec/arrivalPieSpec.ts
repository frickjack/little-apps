import arrivalPie = littleware.arrivalPie;
  

describe( "the littleware.arrivalPie custom element", function() {
    it( "Can convert between an arrival-list and an attribute string", function() {
        let arrList = [ { startAngle: 10, durationDegrees:20 }, { startAngle: 40, durationDegrees: 50 } ],
        arrStr = arrivalPie.arrivalListToString( arrList );
        expect( arrStr ).toBe( arrivalPie.arrivalListToString( arrivalPie.stringToArrivalList( arrStr ) ) ); 
    });

    it( "Can build an SVGPath from an Arrival", function(){
        let arr = { startAngle: 10, durationDegrees: 30 };
        
    });
});
