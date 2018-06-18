import { html, render, TemplateResult } from '../../../../lit-html/lit-html.js';

export const css = html`
<style id="lw-511">
th {
    font-family: 'Noto Sans', sans-serif;
    font-weight: normal;
}


.lw-data-table {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
}

.lw-scroll-container {
    overflow:auto;
}

.lw-scroll-container_history-table {
    height: 200px;
}

lw-arrival-pie {
    width: 200px;
    height: 200px;
    margin: auto;
}

/*.......... start/stop button ............ */

.lw-button {
    width: 100%;
    border-radius: 4px;
    margin-top: 20px;
    margin-bottom: 20px;
    min-height: 50px;
    font-size: large;
}


.lw-button_start {
    background-color:#00DD66;
}

.lw-button_stop {
    background-color:#DD4400;
}

</style>
`;