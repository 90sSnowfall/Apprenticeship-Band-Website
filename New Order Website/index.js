if( document.readyState == 'loading' )
    document.addEventListener('DOMContentLoaded', ready);
else ready();

function ready(){
}

export function aMethod(){
    console.log("Hello world");
}