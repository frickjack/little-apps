namespace littleware {
    export namespace app511 {

        export interface Contraction {
            startTime: Date;
            endTime: Date;
        }

        export interface Stats {
            avePeriodSecs:number;
            aveDurationSecs:number;
            timeCoveredSecs:number;
            numSamples:number;
        }

        /**
         * Little utility converts a date to the degrees represnting
         * the position of the minute-hand on a clock for the given date
         */
        export function date2Degrees( dt:Date ):number {
            return (dt.getMinutes()*60 + dt.getSeconds()) / 10;
        }

        /**
         * Compute statistics over the given history of contractions -
         * assumes contractions are sorted in time-ascending order.
         */
        export function computeStats( history:Contraction[] ):Stats {
            let count = history.length;
            let result = {
                avePeriodSecs: 0,
                aveDurationSecs:0,
                timeCoveredSecs:0,
                numSamples:count
            };
            if ( count > 1 ) {
                let copy:Contraction[] = [].concat( history );
                result.avePeriodSecs = Math.round(
                    history.slice(1).map( 
                        (it) => { return it.startTime.getTime() - copy.shift().startTime.getTime(); } 
                    ).reduce( (acc,it) => { return acc+it; }, 0 ) / (1000 * (count-1))
                );
            }
            if ( count > 0 ) {
                result.aveDurationSecs = Math.round(
                    history.map( 
                        (it) => { return it.endTime.getTime() - it.startTime.getTime(); }
                    ).reduce( (acc,it) => { return acc + it; }, 0 ) / (1000 * count)
                );
                result.timeCoveredSecs = Math.round( (history[0].startTime.getTime() - history[count-1].endTime.getTime())/1000);
            }
            return result;
        }

        /**
         * Manager for the 511 view
         */
        export class Controller511 {
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
                let timeToDegrees
                let arrivalListStr = this.contractionList.map(
                    (cxn) => {
                        return {
                            startDegrees: date2Degrees( cxn.startTime ),
                            endDegrees: date2Degrees( cxn.endTime )
                        }
                    }
                ).map(
                    (deg) => {
                        return "" + deg.startDegrees + "," + ((360 + deg.endDegrees - deg.startDegrees) % 360);
                    }
                ).reduce(
                    (acc,s) => { return acc + s + ";" }, ""
                );
                this.pie.setAttribute( "arrival-list", arrivalListStr + (new Date().getSeconds() * 6) + ",1" );
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
                    button.classList.remove( "lw-button_stop" );
                    button.classList.add( "lw-button_start");
                    button.textContent = button.textContent.replace( "stop", "start" );
                } else {
                    controller.startTimer();
                    button.classList.remove( "lw-button_start" );
                    button.classList.add( "lw-button_stop");
                    button.textContent = button.textContent.replace( "start", "stop" );
                }
            });
            return controller;
        }

    }
}