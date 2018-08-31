import {getStage} from '../../../../little-elements/lib/test/util.js';
import {computeStats, date2Str, Contraction, Controller511, Little511, storageKey} from '../511.js';


describe( "The 511 app controller", function() {
    let lw511:Little511 = null;

    beforeAll(function(done){
        let stage = getStage('511Spec', 'Testing 511 Container');
        lw511 = new Little511();
        stage.appendChild(lw511);
        // return Promise get controller ...
        lw511.ready().then(() => done());
    });

    it( "Exists", function() {
        expect( lw511.controller ).toBeDefined();
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
        lw511.controller.contractionList = [
            { startTime: new Date( nowMs - 15*60*1000 ), endTime:new Date( nowMs - 14*60*1000 )},
            { startTime: new Date( nowMs - 10*60*1000 ), endTime:new Date( nowMs - 9*60*1000 )},
            { startTime: new Date( nowMs - 5*60*1000 ), endTime:new Date( nowMs - 4*60*1000 )},
            { startTime: new Date( nowMs - 2*60*1000 ), endTime:new Date( nowMs - 1*60*1000 )}
        ];
        lw511.controller.startTimer();
        setTimeout( function() {
            expect( lw511.controller.contractionList.length ).toBe( 5 );
            expect( lw511.controller.view.historyTable.querySelectorAll( 'tbody > tr' ).length ).toBe( 5 );
            expect( lw511.controller.contractionList[4].startTime.getTime() + 1 ).toBeGreaterThan( nowMs );
            const check1Ms = Date.now();
            setTimeout( function() {
                expect( lw511.controller.contractionList.length ).toBe( 5 );
                expect( lw511.controller.contractionList[4].endTime.getTime() + 1 ).toBeGreaterThan( check1Ms );
                lw511.controller.endTimer();
                done();
            }, 1000 );
        }, 2000 );
    }, 30000 );

    it( "saves contraction info in localStorage", function() {
        const dataStr = localStorage.getItem( storageKey );
        expect( !! dataStr ).toBe( true );
        const data = JSON.parse( dataStr );
        expect( typeof data.contractionList ).toBe( "object" );
        expect( data.contractionList.length ).toBeGreaterThan( 0 );
    });

    it( "Can format dates", function() {
        expect( date2Str( new Date( "2/3/2011 3:33:22") )).toBe( "3:33:22 AM" );
        expect( date2Str( new Date( "2/3/2011 0:03:02"))).toBe( "12:03:02 AM")
    });

    it ( "clears history", function() {
        lw511.controller.clearHistory();
        expect( lw511.controller.contractionList.length ).toBe( 0 );
        expect( localStorage.getItem( storageKey ) ).toBe( null );
    });
});