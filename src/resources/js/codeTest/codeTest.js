console.log( "Hello, World!" );



/**
 * 
 * @param Array<int|Array<int|...>> inputList 
 */
function flattenListRecurse( inputList, result ) {
    result = result || [];

    inputList.forEach(
        (item) => {
            if ( typeof item === 'object' ) {
                flattenList( item, result );
            } else {
                result.push( item );
            }
        }
    );
    return result;
}


function flattenList( inputList ) {
    const result = [];
    const listStack = [];

    // ILLEGAL result = [1,2,3];
    

    listStack.push( [].concat( inputList ) )

    for( let currentList = listStack.shift(); currentList; currentList = listStack.shift() ) {
        for( let item = currentList.shift(); item; item = currentList.shift() ) {
            if ( typeof item === 'object' ) {
                listStack.push( currentList );
                currentList = item;
            } else {
                result.push( item );
            }
        }
    }
    
    return result;
}


function testFlattenList() {
    var result = flattenList(
        [1,2,3,4,5]
    );

    console.log( "Got result: " + result.join( ",") );

    result = flattenList(
        [1,2,[3,4,[5,6,[7,8,9,[10]]]]]
    );

    console.log( "Got result: " + result.join( "," ) );
}

testFlattenList();

