// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function() {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );

        console.log("Device ready...");
        console.log(navigator.userAgent);
        start(); // User Code
    };

    function onPause() {
        console.log("Application paused...");
    };

    function onResume() {
        console.log("application resumed...");
    };

    function start() {
        var name = document.getElementById("Name");
        var message = document.getElementById("Message");

        name.addEventListener("keyup", function() {
            var ua = navigator.userAgent;
            console.log(ua);
            message.innerText = name.value;
        });
    }
})();