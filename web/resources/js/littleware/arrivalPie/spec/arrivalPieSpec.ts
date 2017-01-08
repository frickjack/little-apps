import * as ArrivalPie from "../arrivalPie";
  

describe( "the littleware.arrivalPie custom element", function() {
    it( "Can convert between an arrival-list and an attribute string", function() {
        let arrList = [ { startAngle: 10, durationDegrees:20 }, { startAngle: 40, durationDegrees: 50 } ],
        arrStr = ArrivalPie.arrivalListToString( arrList );
    });
});
