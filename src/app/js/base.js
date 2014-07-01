/* global alert, console */
"use strict";
// Install app
if (navigator.mozApps) {
    var checkIfInstalled = navigator.mozApps.getSelf();
    checkIfInstalled.onsuccess = function () {
        if (checkIfInstalled.result) {
            // Already installed
            var installationInstructions = document.querySelector(".install-button-container");
            if (installationInstructions) {
                installationInstructions.style.display = "none";
            }
        }
        else {
            var install = document.querySelector("#install-button"),
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
            dialogue.classList.add('banner-animate');
            
            var animationEndHandler = function(e) {
                this.classList.remove('banner-animate');
                this.removeEventListener(e.type,animationEndHandler,e.eventPhase);
            }

            dialogue.addEventListener('animationend', animationEndHandler, false)

            dialogue.classList.remove('is-hidden');
            // dialogueContainer.classList.remove('is-hidden');

        })
    }

    // tab bars
    var tabElem = document.querySelectorAll(".tabs-item");
    for (var i = 0, length = tabElem.length; i < length; i++) {
        var el = tabElem[i];
        el.addEventListener('click', function(e) {
            e.preventDefault();
            var selected = this.parentNode.querySelector('.tabs-is-selected');
            selected.classList.remove('tabs-is-selected');
            this.classList.add('tabs-is-selected');
        });
    }

    //  menu item
    var menuElem = document.querySelectorAll(".menu-item");
    for (var i = 0, length = menuElem.length; i < length; i++) {
        var el = menuElem[i];
        el.addEventListener('click', function(e) {
            var animate = document.querySelector('.menu-item-animate');
            if (animate) animate.classList.remove('menu-item-animate');
            var selected = this.querySelector('.menu-item-selected');            
            if (selected) {
                var w = selected.parentNode.offsetWidth*2;
                selected.style.width = w+'px';
                selected.style.height = w+'px';
                selected.style.top = (w/2*-1)+(this.offsetHeight/2)+'px';
                selected.style.left = (e.layerX-(w/2))+'px';
                selected.classList.add('menu-item-animate');
            }
        });    
    }

    

    var scrollY = 0;
    var direction = 0;
    var move = 0;

    window.onscroll = function(e) {
        if (scrollY<e.pageY) move = -1;
        else move = 1; 

        scrollY=e.pageY;

        if (move != direction) {
            if (direction == -1) {
                document.querySelector('.sg-toolbar').style.transform="translateY(0)";
            } else {
                document.querySelector('.sg-toolbar').style.transform="translateY(-100%)";

            }

            direction = move;
        } 
    }
}

// var dialogueConfirm = document.getElementById("dialogue-confirmation");

// dialogueConfirm.addEventListener('click', function(e) { 
//     document.querySelector('.dialogue').classList.remove('is-hidden');
//     document.querySelector('.dialogue-confirm').classList.remove('is-hidden');
// });


// var s,
// Styleguide = {
//     settings: {

//     },
    

//     bindUiActions: function() {
//         console.log("bind ui actions");
//     },
//     intro: function() {
//         var titleScreen = document.querySelector(".sg-landing");
//         this.screenSwipeMngr.gestureDetector = new GestureDetector(titleScreen);
//         this.screenSwipeMngr.screen = titleScreen;

//         ['touchstart','touchend','mousedown', 'mouseup', 'pan', 'tap', 'swipe'].forEach(function(evt) {
//             titleScreen.addEventListener(evt,
//                 this.screenSwipeMngr[evt].bind(this.screenSwipeMngr));
//             }, this);
//         this.screenSwipeMngr.gestureDetector.startDetecting()

//     },
//     transitioning: false,
//     screenSwipeMngr: {
//         TRANSITION_SPEED: 1.8,
//         TRANSITION_FRACTION: 0.50,
//         DEFAULT_TRANSITION: 'transform 0.2s ease-in-out, height 0.2s ease-in-out',

//         gestureDetector: null,
//         browser: null,
//         screen: null,
//         winHeight: null,

//         touchstart: function screenSwipe_touchstart(e) {
//             console.log('touchstart');
//             e.preventDefault();

//             this.winHeight = window.innerHeight;
//             this.screen.style.transition = 'none';
//         },
//         touchend: function screenSwipe_touchend(e) {
//             console.log('touchend');
//             if (this.transitioning) {
//                 return false;
//             }
//             this.screen.style.transform = '';
//             this.screen.style.transition = this.DEFAULT_TRANSITION;

//         },
//         mousedown: function screenSwipe_mousedown(e) {
//             this.touchstart(e);
//         },

//         mouseup: function screenSwipe_mouseup(e) {
//             this.touchend(e); 
//         },
        
//         pan: function screenSwipe_pan(e) {
//             console.log('pan');
//             var topPos = e.detail.absolute.dy;
//             if (topPos > 0) {
//                 return false;
//             }
//             this.screen.style.transform = 'translateY('+topPos+'px)';
//         },

//         tap: function screenSwipe_tap(e) {
//             // bounce screen

//             // this.screen.style.MozTransition = this.DEFAULT_TRANSITION;
//             // this.browser.showPageScreen();
//         },

//         swipe: function screenSwipe_swipe(e) {
//             // We only want to deal with left to right swipes
//             var fastenough = e.detail.vx > this.TRANSITION_SPEED;
//             var distance = e.detail.start.screenY - e.detail.end.screenY;
//             var farenough = Math.abs(distance) > this.winHeight * this.TRANSITION_FRACTION;
//             if (farenough || fastenough) {
                
//                 this.transitioning = true;
//                 this.screen.style.transition = this.DEFAULT_TRANSITION;
//                 this.screen.style.transform = 'translateY(-'+this.winHeight+'px)';
                
//                 console.log("go!");
//                 // intro.hideIntro();
//                 return;
//             }
//         }
//     },

//     init: function() {
//         s = this.settings;
//         this.intro();
//         // this.bindUiActions();
//     }
// };



// (function() {
//     Styleguide.init();
// })();