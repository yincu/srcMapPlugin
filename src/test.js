/**
 * Created by Fighting on 2017/8/20.
 */

function helloWorld( ) {
    var helloworld = "Hello world!";
    console.log(helloworld);
    alert( helloworld );
}

function hiWebpack(){
    var hi = "Hi webpack!";
    console.log( hi );
    alert( hi );
}


var button1 = document.getElementById( "webpack");
button1.onclick = hiWebpack;

var button2 = document.getElementById("world");
button2.onclick = helloWorld;

