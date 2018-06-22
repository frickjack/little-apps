import {setTestController} from './511Spec.js';
import {startTest} from '../../../../little-elements/lib/test/util.js';
import {attachController} from '../511.js';
import '../../lib/headerSimple/headerSimple.js';

document.addEventListener("DOMContentLoaded", function(event) {
    setTestController( 
        attachController(
            {
                pie: document.body.querySelector( "lw-arrival-pie" ),
                historyTable: document.body.querySelector( "table#history" ),
                statsTable: document.body.querySelector( "table#stats" ),
                startStopButton: document.body.querySelector( "button#startStop" ),
                clearHistoryButton: document.body.querySelector( "button#clearHistory" ),
                clearHistoryModal: document.body.querySelector( "div#clearHistoryModal" )
            }
        )
    );
    startTest();
});
