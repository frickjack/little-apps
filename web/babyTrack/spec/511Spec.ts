/// <reference path="../511.ts" />
/// <reference path="../../resources/js/littleware/arrivalPie/arrivalPie.ts" />
/// <reference path="../../resources/js/littleware/test/util.ts" />

namespace littleware {
    export namespace app511 {
        import arrivalPie = littleware.arrivalPie;
        import littleTest = littleware.test; 

        export var testController:Controller511 = null;

        describe( "The 511 app controller", function() {
            it( "Exists", function() {
                // testController is iniialized in 511.html ...
                expect( testController ).toBeDefined();
            });

            it( "Can compute stats", function() {
                let sampleData:Array<Contraction> = [ 
                    { startTime: new Date( 100 ), endTime: new Date( 61100 ) },
                    { startTime: new Date( 300000 ), endTime: new Date( 360000 ) }
                    ];
                let stats = computeStats( sampleData );
                expect( stats.avePeriodSecs ).toBe( Math.round( 300 - 0.100 ) );
                expect( stats.aveDurationSecs ).toBe( Math.round( (61 + 60) / 2 ) );
                expect( stats.timeCoveredSecs ).toBe( 360 );
            });

            it( "Can update info on an ongoing contraction", function() {
                testController.contractionList = [

                ];
                expect( false ).toBe( true );
            });
        });
    }
}
