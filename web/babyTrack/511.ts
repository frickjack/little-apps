namespace littleware {
    export namespace app511 {

        export interface Contraction {
            startTime: Date;
            endTime: Date;
        }

        /**
         * Manager for the 511 view
         */
        class Controller511 {
            private _timerInterval:any;
            contractionList:Contraction[];

            pie:HTMLElement;
            dataTable:HTMLElement;
            statsTable:HTMLElement;
            button:HTMLElement;

            constructor( pie:HTMLElement, dataTable:HTMLElement, statsTable:HTMLElement, button:HTMLElement, contractionList:Contraction[] ) {
                this.contractionList = [];
                this._timerInterval = null;
                this.pie = pie;
                this.statsTable = statsTable;
                this.dataTable = dataTable;
                this.button = button;
            }

            /**
             * Update the UX to match the current state of the controller
             */
            render():void {
                console.log( "Render!" );
            }

            get isTimerRunning() {
                return !! this._timerInterval;
            }

            startTimer():void {
                if ( ! this._timerInterval ) {
                    let contraction = {
                        startTime: new Date(),
                        endTime: new Date()
                    };
                    this.contractionList.push( contraction );
                    this._timerInterval = setInterval(
                        () => {
                            contraction.endTime = new Date();
                            this.render();
                        },
                        500
                    );
                } else {
                    console.log( "ignoring duplicate startTimer call" );
                }
            }

            endTimer():void {
                if ( this._timerInterval ) {
                    clearInterval( this._timerInterval );
                    this._timerInterval = null;
                } else {
                    console.log( "ignoring endTimer call - no active interval" );
                }
            }
        }
    

        /**
         * Attach a controller to the DOM elements that make up the 511 UX
         */
        export function attachController( pie:HTMLElement, dataTable:HTMLElement, statsTable:HTMLElement, button:HTMLElement ):any {
            let controller = new Controller511( pie, dataTable, statsTable, button, [] );
            button.addEventListener( "click", function() {
                if ( controller.isTimerRunning ) {
                    controller.endTimer();
                } else {
                    controller.startTimer();
                }
            });
        }

    }
}