import {getStage} from '../../../../little-elements/lib/test/util.js';
import {SimpleHeader} from '../headerSimple.js';

describe( "the lw-header-simple custom element", function() {
    it ( "Has a static observedAttributes property", function() {
        let propList = SimpleHeader.observedAttributes;
        expect( propList.length ).toBe( 1 );
        expect( propList[0] ).toBe( "title" );
    });

    it( "Can allocate a SimpleHeader object", function(){
        let hd = new SimpleHeader();
        expect( hd ).toBeDefined();
    });

    it ( "Listens for attribute change events on 'title' attribute", function() {
        let hd = new SimpleHeader();
        let stage = getStage( "changeCallback", "Testing attributeChangedCallback" );
        stage.appendChild( hd );
        spyOn( hd, "_render" ).and.callThrough();
        hd.setAttribute( "title", "TestTitle" );
        expect( (hd._render as any).calls.any() ).toBe( true );
        expect( hd.querySelector( "td.lw-header__title" ).textContent ).toBe( "TestTitle" );
    });

    it( "Can render a SimpleHeader", function() {
        let stage = getStage( "header1", "SimpleHeader - 'Test Title'" );
        let hd = document.createElement( "lw-header-simple" );
        stage.appendChild( hd );
        hd.setAttribute( "title", "Test Title");
        expect( stage.querySelector( "td.lw-header__title" ).textContent ).toBe( "Test Title" );
    });
});
