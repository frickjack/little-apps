import { html, render, TemplateResult } from '../../../../lit-html/lit-html.js';

export const css = html`
<style id="lw-headerSimple">
lw-header-simple {
    width: 100%;
}

.lw-header {    
    padding:2px;
    width: 100%;
    background-color:#0BDAF7;
    font-family: 'Noto Sans'
}

.lw-header__nav {
    width: 30%;
    padding: 0px;
}   

.lw-header__link {
    color:#777;
}   

.lw-header__link:hover {
    color:#777;
    background-color:#0BDAF7;
}   

.lw-header__title {
    width: 70%;
    padding: 0px;
}
</style>
`;