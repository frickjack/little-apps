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

            it( "Can update info on an ongoing contraction", function(done) {
                const nowMs = Date.now();
                testController.contractionList = [
                    { startTime: new Date( nowMs - 15*60*1000 ), endTime:new Date( nowMs - 14*60*1000 )},
                    { startTime: new Date( nowMs - 10*60*1000 ), endTime:new Date( nowMs - 9*60*1000 )},
                    { startTime: new Date( nowMs - 5*60*1000 ), endTime:new Date( nowMs - 4*60*1000 )},
                    { startTime: new Date( nowMs - 2*60*1000 ), endTime:new Date( nowMs - 1*60*1000 )}
                ];
                testController.startTimer();
                setTimeout( function() {
                    expect( testController.contractionList.length ).toBe( 5 );
                    expect( testController.contractionList[4].startTime.getTime() + 1 ).toBeGreaterThan( nowMs );
                    const check1Ms = Date.now();
                    setTimeout( function() {
                        expect( testController.contractionList.length ).toBe( 5 );
                        expect( testController.contractionList[4].endTime.getTime() + 1 ).toBeGreaterThan( check1Ms );
                        testController.endTimer();
                        done();
                    }, 1000 );
                }, 2000 );
            }, 30000 );
        });
    }
}
