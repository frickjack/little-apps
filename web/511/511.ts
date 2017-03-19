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
                result.timeCoveredSecs = Math.round( (history[count-1].endTime.getTime() - history[0].startTime.getTime())/1000);
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
             * 
             * @param includeSecondHand whether or not to render a clock hand at the current second
             */
            render( includeSecondHand:boolean ):void {
                //
                // First - update the pie widget - pie only shows
                // data for contractions that occurred over the last hour
                //
                let nowMs = Date.now();
                let oneHourMs = 60*60*1000;
                let oneHourHistory = this.contractionList.filter(
                    (cxn) => { return nowMs - cxn.startTime.getTime() < oneHourMs }
                );
                let arrivalListStr = oneHourHistory.map(
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
                if ( includeSecondHand ) {
                    arrivalListStr += (new Date().getSeconds() * 6) + ",1";
                }
                this.pie.setAttribute( "arrival-list", arrivalListStr );

                // update the stats table
                let stats = computeStats( oneHourHistory );
                let statCells = this.statsTable.querySelectorAll( 'td' );
                if ( statCells.length > 2 ) {
                    statCells[0].textContent = "" + Math.round( stats.avePeriodSecs ) + " secs";
                    statCells[1].textContent = "" + Math.round( stats.aveDurationSecs ) + " secs";
                    statCells[2].textContent = "" + (Math.round( stats.timeCoveredSecs / 0.6 )/100) + " mins";
                } else {
                    console.log( "ERROR: malformed stats table" );
                }
            }

            get isTimerRunning() {
                return !! this._timerInterval;
            }

            /**
             * Internal helper updates the endTime on the most recent
             * contraction to now - unless that update would give the latest contraction
             * a duration over 10mins - in which case we auto-add a new Contraction.
             * Also - limits the list to 100 entries.
             * These rules have to do with limitations on our view (pie only supports
             * accute angle slices, and table is only useful up to 100 entries) 
             * 
             * @return the most recent contraction
             */
            _updateLatestContraction():Contraction {
                let now = new Date();

                if( this.contractionList.length < 1 ) {
                    this.contractionList.push(
                        { startTime: now, endTime: now }
                    );
                }
                let cxn = this.contractionList[ this.contractionList.length - 1 ];
                let durationMins = (now.getTime() - cxn.startTime.getTime()) / 60000;
                if ( durationMins < 10 ) {
                    cxn.endTime = new Date();
                } else {
                    // start a new contraction if last duration would be over 10 mins
                    cxn = { startTime:now, endTime:now };
                    this.contractionList.push( cxn );
                }
                // 
                // Limit the contraction list to 100 entries
                //
                if ( this.contractionList.length > 100 ) {
                    this.contractionList.splice( 0, this.contractionList.length - 100 );
                }

                return cxn;
            }


            /**
             * Add a new contraction to the contractionList, and
             * setup an interval to update that contraction's endTime,
             * and re-render the view.
             */
            startTimer():void {
                if ( ! this._timerInterval ) {
                    let cxn = {
                        startTime: new Date(),
                        endTime: new Date()
                    };
                    this.contractionList.push( cxn );
                    this._timerInterval = setInterval(
                        () => {
                            var nowMs = Date.now();
                            
                            let latest = this._updateLatestContraction();
                            if ( latest !== cxn ) {
                                // assume the user has gone away after 10 mins - need to get to hostpital anyway!
                                this.endTimer();
                            } else {
                                this.render(true);
                            }
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
                    this.render(false);
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