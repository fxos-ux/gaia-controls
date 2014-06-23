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


window.onload = function() {
    // styleguide
    // dialogues
    var dialogueElem = document.querySelectorAll(".dialogue-display");
    var dialogueContainer = document.querySelector('.dialogue-container');
    var currentDialogue = null;

    for (var i = 0, length = dialogueElem.length; i < length; i++) {
        dialogueElem[i].addEventListener('click', function(e) {
            e.preventDefault();
            var dialogue = document.querySelector(this.getAttribute("href"));
            currentDialogue = dialogue;
            dialogue.classList.remove('is-hidden');
            dialogueContainer.classList.remove('is-hidden');
        })
    };

    var dialogueButtonElem = document.querySelectorAll(".dialogue-button");
    for (var i = 0, length = dialogueButtonElem.length; i < length; i++) {
        var el = dialogueButtonElem[i];
        el.addEventListener("click", function() {
            if (currentDialogue) {
                currentDialogue.classList.add('is-hidden');
                dialogueContainer.classList.add('is-hidden');
            }
        });
    }

    // banner
    var bannerELem = document.querySelectorAll(".banner-display");
    for (var i = 0, length = bannerELem.length; i < length; i++) {
        var el = bannerELem[i];
        el.addEventListener("click", function(e) {
            e.preventDefault();
            var dialogue = document.querySelector(this.getAttribute("href"));
            currentDialogue = dialogue;
            dialogue.classList.remove('is-hidden');
            // dialogueContainer.classList.remove('is-hidden');

        })
    }
    
}



// var dialogueConfirm = document.getElementById("dialogue-confirmation");

// dialogueConfirm.addEventListener('click', function(e) { 
//     document.querySelector('.dialogue').classList.remove('is-hidden');
//     document.querySelector('.dialogue-confirm').classList.remove('is-hidden');
// });