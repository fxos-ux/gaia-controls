/* global alert, console */
"use strict";
// Install app
if (navigator.mozApps) {
    var checkIfInstalled = navigator.mozApps.getSelf();
    checkIfInstalled.onsuccess = function () {
        if (checkIfInstalled.result) {
            // Already installed
            var installationInstructions = document.querySelector("#installation-instructions");
            if (installationInstructions) {
                installationInstructions.style.display = "none";
            }
        }
        else {
            var install = document.querySelector("#install"),
                manifestURL = location.href.substring(0, location.href.lastIndexOf("/")) + "/manifest.webapp";
            install.onclick = function () {
                var installApp = navigator.mozApps.install(manifestURL);
                installApp.onsuccess = function() {
                    install.style.display = "none";
                };
                installApp.onerror = function() {
                    alert("Install failed\n\n:" + installApp.error.name);
                };
            };
        }
    };
}
else {
    console.log("Open Web Apps not supported");
}

// Reload content
var reload = document.querySelector("#reload");
if (reload) {
    reload.onclick = function () {
        location.reload(true);
    };
}



// Checkbox
var toggles = document.querySelectorAll('.toggle');
for (var i = 0; i < toggles.length; i++) {
    var toggleElem = toggles[i];
    toggleElem.addEventListener('click', function() {
        this.classList.toggle('is-checked');
    })       
}



// styleguide

var dialogueConfirm = document.getElementById("dialogue-confirmation");

dialogueConfirm.addEventListener('click', function(e) {
    
    document.querySelector('.dialogue').classList.remove('is-hidden');
    document.querySelector('.dialogue-confirm').classList.remove('is-hidden');
});