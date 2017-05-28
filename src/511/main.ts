/// <reference path="./511.ts" />

document.addEventListener("DOMContentLoaded", function(event) {
    littleware.app511.testController = littleware.app511.attachController(
        {
            pie: document.body.querySelector( "lw-arrival-pie" ),
            historyTable: document.body.querySelector( "table#history" ),
            statsTable: document.body.querySelector( "table#stats" ),
            startStopButton: document.body.querySelector( "button#startStop" ),
            clearHistoryButton: document.body.querySelector( "button#clearHistory" ),
            clearHistoryModal: document.body.querySelector( "div#clearHistoryModal" )
        }
    );
});
