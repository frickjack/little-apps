import { html, render, TemplateResult } from "../../../../../lit-html/lit-html.js";

export const css = html`
<style id="lw-jwt">

.lw-jwt-container {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
}

.lw-jwt-error {
    color: red;
}

.lw-jwt-code {
    background-color: #d0d0d0;
    min-height: 3em;
    padding: 10px;
    margin: 5px 0px 15px 0px;
    overflow-wrap: break-word;
    overflow: auto;
}

.lw-jwt-paste-target {
    background-color: pink;
    min-height: 3em;
    padding: 10px;
    margin: 5px 0px 15px 0px;
    border: 5px pink ridge;
}

</style>
`;
