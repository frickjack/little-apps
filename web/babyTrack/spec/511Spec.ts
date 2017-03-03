/// <reference path="../511.ts" />
/// <reference path="../../resources/js/littleware/test/util.ts" />

namespace littleware {
    export namespace app511 {
        import arrivalPie = littleware.arrivalPie;
        import littleTest = littleware.test; 

        export var testController:Controller511 = null;

        describe( "The 511 app controller", function() {
            it( "Exists", function() {
                expect( testController ).toBeDefined();
            });

            it( "Can compute stats", function() {
                let sampleData:Array<Contraction> = [ 
                    { startTime: new Date( 100 ), endTime: new Date( 61100 ) } 
                    ];
                let stats = computeStats( sampleData );
                expect( stats.avePeriodSecs ).toBe( 0 );
                expect( stats.aveDurationSecs ).toBe( 61 );
            });
        });
    }
}
