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


function flattenListShift( inputList ) {
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

function flattenListPop( inputList ) {
    const result = [];
    const listStack = [];

    // ILLEGAL result = [1,2,3];
    

    listStack.push( [].concat( inputList ) )

    for( let currentList = listStack.pop(); currentList; currentList = listStack.pop() ) {
        for( let item = currentList.shift(); item; item = currentList.shift() ) {
            if ( typeof item === 'object' ) {
                listStack.push( currentList );
                currentList = [].concat( item );
            } else {
                result.push( item );
            }
        }
    }
    
    return result;
}


function testFlattenList(flattenList) {
    var result = flattenList(
        [1,2,3,4,5]
    );

    console.log( "Got result: " + result.join( ",") );

    result = flattenList(
        [1,2,[3,4,[5,6,[7,8,9,[10]]]]]
    );

    console.log( "Got result: " + result.join( "," ) );

    result = flattenList(
        [1,2,[3,4,[[5],6,[7,8,9,[10]]]],11,12,[13,14,[15,[16],[17,18,19,[20]]]],21]
    );

    console.log( "Got result: " + result.join( "," ) );
}

console.log( "With shift:" );
testFlattenList( flattenListShift );
console.log( "-------------------------" );
console.log( "With pop: " );
testFlattenList( flattenListPop );

