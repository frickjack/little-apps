import { html, render } from '../../../../../lit-html/lit-html.js';
import '../../../../../@littleware/little-elements/web/lib/arrivalPie/arrivalPie.js';
import {singleton as styleHelper} from '../../../../../@littleware/little-elements/web/lib/styleGuide/styleGuide.js';
import {css} from './511.css.js';


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

function templateFactory() {
    const template = html`
<div class="pure-u-1-1 pure-u-md-1-2">
    <lw-arrival-pie arrival-list=""></lw-arrival-pie>
   <button id="startStop" autofocus="true" type="button" class="pure-button pure-button-primary lw-button lw-button_start">start contraction</button>
</div>
<div class="pure-u-1-1 pure-u-md-1-2">
  <table id="stats" class="lw-data-table pure-table">
    <thead>
        <tr>
            <th class="lw-data-table__hcell">Ave Period mins:secs</th>
            <th class="lw-data-table__hcell">Ave Duration</th>
            <th class="lw-data-table__hcell">Time Covered</th>
          </tr>
    </thead>
    <tbody>
        <tr>
            <td class="lw-data-table__dcell">0</td>
            <td class="lw-data-table__dcell">0</td>
            <td class="lw-data-table__dcell">-</td>
          </tr>
    </tbody>
  </table>
  <div class="lw-scroll-container lw-scroll-container_history-table">
    <table id="history" class="lw-data-table pure-table pure-table-striped">
      <thead>
          <tr>
              <th class="lw-data-table__hcell">Start</th>
              <th class="lw-data-table__hcell">End</th>
              <th class="lw-data-table__hcell">Duration</th>
              </tr>
      </thead>
      <tbody>
          <tr>
              <td class="lw-data-table__dcell">-</td>
              <td class="lw-data-table__dcell">-</td>
              <td class="lw-data-table__dcell">-</td>
              </tr>
      </tbody>
    </table>
  </div>
  <button id="clearHistory" type="button" class="pure-button lw-button">Clear History</button>
</div>
<div id="clearHistoryModal" class="lw-modalDialog">
    <div class="lw-modalDialog__content">
        <a href="#app" class="lw-modalDialog__closeX">X</a>
        <p>
            Clear the history of contractions ?
        </p>
        <button id="clearHistoryOk" type="button" class="pure-button pure-button-primary lw-button">Do it!</button>
    </div>
</div>
    `;
    return template;
}

/**
 * Little utility converts a date to the degrees represnting
 * the position of the minute-hand on a clock for the given date
 */
export function date2Degrees( dt:Date ):number {
    return (dt.getMinutes()*60 + dt.getSeconds()) / 10;
}

export function date2Str( dt:Date ):string {
    const hrs = dt.getHours();
    const amPm = (hrs < 12) ? "AM" : "PM";
    return ("" + (hrs % 12 === 0 ? 12 : hrs % 12) + ":0" + dt.getMinutes() + ":0" + dt.getSeconds() + " " + amPm).replace( /:0+(\d\d+)/g, ":$1" );
}

export function secs2Str( numSecs:number ):string {
    return "" + Math.floor( numSecs / 60 ) + ":" + ( "00" + (numSecs % 60)).substr(-2);
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

export const storageKey = "511Data";

export interface View511 {
    pie:Element;
    historyTable:Element;
    statsTable:Element;
    startStopButton:Element,
    clearHistoryButton:Element,
    clearHistoryModal:Element
};

/**
 * Manager for the 511 view
 */
export class Controller511 {
    private _timerInterval:any;
    contractionList:Contraction[];

    view:View511;
    
    constructor( view:View511, contractionList:Contraction[] ) {
        this.contractionList = contractionList;
        this._timerInterval = null;
        this.view = view;
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
        this.view.pie.setAttribute( "arrival-list", arrivalListStr );

        // update the stats table
        let stats = computeStats( oneHourHistory );
        let statCells = this.view.statsTable.querySelectorAll( 'td' );
        if ( statCells.length > 2 ) {
            const durMins = Math.floor( stats.avePeriodSecs / 60 );
            const remainingSecs = stats.avePeriodSecs % 60;
            statCells[0].textContent = secs2Str( stats.avePeriodSecs );
            statCells[1].textContent = secs2Str( stats.aveDurationSecs );
            statCells[2].textContent = secs2Str( stats.timeCoveredSecs );
        } else {
            console.log( "ERROR: malformed stats table" );
        }

        // update the history table
        let dataBody = this.view.historyTable.querySelector( 'tbody' );
        while( dataBody.hasChildNodes() ) {
            dataBody.removeChild( dataBody.childNodes[0] );
        }
        oneHourHistory.reverse().forEach(
            (cxn, index) => {
                let tr = document.createElement( "TR" );
                let tdStart = document.createElement( "TD" );
                tdStart.className = "lw-data-table__dcell";
                tdStart.innerText = date2Str( cxn.startTime );
                let tdEnd = document.createElement( "TD" );
                tdEnd.className = "lw-data-table__dcell";
                tdEnd.innerText = date2Str( cxn.endTime );
                let tdDuration = document.createElement( "TD" );
                tdDuration.className = "lw-data-table__dcell";
                tdDuration.innerText = "" + Math.round((cxn.endTime.getTime() - cxn.startTime.getTime()) / 1000) + " secs";
                [tdStart,tdEnd,tdDuration].forEach( (td) => { tr.appendChild(td); });
                dataBody.appendChild(tr);
            }
        );

        // update the button
        if ( this.isTimerRunning ) {
            this.view.startStopButton.classList.remove( "lw-button_start" );
            this.view.startStopButton.classList.add( "lw-button_stop");
            this.view.startStopButton.textContent = this.view.startStopButton.textContent.replace( "start", "stop" );
        } else {
            this.view.startStopButton.classList.remove( "lw-button_stop" );
            this.view.startStopButton.classList.add( "lw-button_start");
            this.view.startStopButton.textContent = this.view.startStopButton.textContent.replace( "stop", "start" );
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
        //
        // Persist to local storage
        //
        localStorage.setItem( storageKey, JSON.stringify( { contractionList: this.contractionList } ));
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

    /**
     * End the timer started by startTimer, and re-render
     * 
     * @return true if timer cleared and render called, false if NOOP
     *          since timer was not running
     */
    endTimer():boolean {
        if ( this._timerInterval ) {
            clearInterval( this._timerInterval );
            this._timerInterval = null;
            this.render(false);
            return true;
        } else {
            console.log( "ignoring endTimer call - no active interval" );
            return false;
        }
    }

    /**
     * Clear the history contraction list, clear the start-timer interval if any,
     * and re-render
     */
    clearHistory():void {
        localStorage.removeItem( storageKey );
        this.contractionList = [];
        this.closeClearHistoryModal();
        if ( ! this.endTimer() ) {
            this.render( false );
        }
    }

    openClearHistoryModal():void {
        this.view.clearHistoryModal.classList.add( "lw-modalDialog_open" );
    }

    closeClearHistoryModal():void {
        this.view.clearHistoryModal.classList.remove( "lw-modalDialog_open" );
    }
}


/**
 * Attach a controller to the DOM elements that make up the 511 UX
 */
export function attachController( 
    view:View511
    ):Controller511 {
    let contractionList = [];
    try {
        let data = JSON.parse(localStorage.getItem( storageKey ) || '{}');
        contractionList = (data.contractionList || []).map(
            function(js) {
                return {
                    startTime: new Date( js.startTime ),
                    endTime: new Date( js.endTime )
                }
            }
        );
    } catch ( err ) {
        console.log( "Failed parsing 511 local storage", err );
    }
    
    let controller = new Controller511( view, contractionList );
    view.startStopButton.addEventListener('click', function(ev) {
        if ( controller.isTimerRunning ) {
            controller.endTimer();
        } else {
            controller.startTimer();
        }
    });

    view.clearHistoryButton.addEventListener('click', function(ev) {
        controller.openClearHistoryModal();
    });
    const closeX = view.clearHistoryModal.querySelector( "a.lw-modalDialog__closeX" );
    if ( closeX ) {
        closeX.addEventListener( "click", function(ev) {
            controller.closeClearHistoryModal();
        });
    } else {
        console.log( "WARNING - no 'closeX' link found in clearHistory modal" );
    }
    const okButton = view.clearHistoryModal.querySelector( "button" );
    if ( okButton ) {
        okButton.addEventListener('click', function(ev) {
            controller.clearHistory();
        });
    } else {
        console.log( "WARNING - no 'ok' button found in clearHistory modal" );
    }
    controller.render(false);
    return controller;
}

/**
 * 511 custom element
 */
export class Little511 extends HTMLElement {
    _isRendered:boolean = false;
    controller:Controller511 = null;

    // Can define constructor arguments if you wish.
    constructor() {
      // If you define a ctor, always call super() first!
      // This is specific to CE and required by the spec.
      super();
    }

    //static get observedAttributes():Array<string> { return ['title']; }

    connectedCallback(): void {
        this._render();
    }

    disconnectedCallback(): void {
    }

    attributeChangedCallback(attrName?: string, oldVal?: string, newVal?: string): void {
      //console.log( "Attribute change! " + attrName );
      //this._render();
    }

    adoptedCallback(): void {}

    /**
     * Little helper resolves once this element has
     * been rendered
     */
    ready(): Promise<Little511> {
        return new Promise((resolve, reject) => {
            if (this._isRendered){
                resolve(this);
            }
            (this as any).resolveReady = resolve;
        });
    }

    /**
     * Simple adaptation of legacy controller-based rendering
     */
    _render():void {
        if (!this._isRendered) {
          render(templateFactory(), this);
          this.controller = attachController(
            {
                pie: this.querySelector('lw-arrival-pie'),
                historyTable: this.querySelector('table#history'),
                statsTable: this.querySelector('table#stats'),
                startStopButton: this.querySelector('button#startStop'),
                clearHistoryButton: this.querySelector('button#clearHistory'),
                clearHistoryModal: this.querySelector('div#clearHistoryModal')
            }
          );
          this._isRendered = true;
          const self:any = this;
          if (typeof self.resolveReady === 'function') {
            self.resolveReady(this);
          }
        }
    }
}

window.customElements.define('lw-511', Little511);

styleHelper.componentCss.push(css);
styleHelper.render();
