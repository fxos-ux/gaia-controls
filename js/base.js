/* global alert, console */
"use strict";
// Install app

function Styleapp() {
    function initAppinstall() {
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

        function installApp(aFileName){
            var manifestURL = location.href.substring(0, location.href.lastIndexOf("/")) + "/" + aFileName;
            
            var installApp = navigator.mozApps.install(manifestURL);

             installApp.onsuccess = function() {
                console.log("installed!");
            };
            installApp.onerror = function() {
                console.log("Install failed\n\n:" + installApp.error.name);
            };
        }
    }


    function initMenus() {
        var menuElem = document.querySelectorAll(".menu-item");
        for (var i = 0, length = menuElem.length; i < length; i++) {
            var el = menuElem[i];
            el.addEventListener('click', function(e) {
                var animate = document.querySelector('.menu-item-animate');
                if (animate) {
                    animate.classList.remove('menu-item-animate');
                }

                var selected = this.querySelector('.menu-item-selected');            
                // Size selected div to to fill menu container.
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
    }

    function initTabs() {
        var tabsElem = document.querySelectorAll('.tabs');

        for (var i = 0, length = tabsElem.length; i < length; i++) {
            var el = tabsElem[i];
            moveTabs(el);

            // add click events to each tab 
            var tabs = el.querySelectorAll('.tabs-item');
            for (var j = 0, jlength = tabs.length; j < jlength; j++) {
                var tab =tabs[j];
                tab.addEventListener('click', function(e) {
                    this.parentNode.querySelector('.tabs-item-selected')
                        .classList.remove('tabs-item-selected');
                    this.classList.add('tabs-item-selected');
                    moveTabs(this.parentNode);
                });
            }
        }

        function moveTabs(tabs) {
            var select = tabs.querySelector('.tabs-item-selected');
            var selectIndicator = tabs.querySelector('.tabs-selected-indicator');
            if (select != null && selectIndicator != null) {
                selectIndicator.style.width = select.offsetWidth+'px';
                selectIndicator.style.left = select.offsetLeft+'px';
            } 
        }
    }

    function initDialogues() {
        var currentDialogue = null;
        
        var dialogueContainer = document.querySelector('.dialogue-container');  // dialogue container that all dialogues sit on top of.
        var bannerContainer = document.querySelector('.banner-container');
        initDialogueBanners();
        initDialogueLayout();
        initDialogueButtons();

        function initDialogueBanners() {
            var bannerELem = document.querySelectorAll(".banner-display");
            for (var i = 0, length = bannerELem.length; i < length; i++) {
                var el = bannerELem[i];
                el.addEventListener("click", function(e) {
                    // e.preventDefault();
                    // var dialogue = document.querySelector(this.getAttribute("href"));
                    // currentDialogue = dialogue;
                    // dialogue.classList.add('banner-animate');
                    
                    // dialogue.addEventListener('animationend', function endHandler() {
                    //     this.removeEventListener('animationend', endHandler);
                    // }, false)

                    // dialogue.classList.remove('is-hidden');
                    e.preventDefault();
                    var dialogue = document.querySelector(this.getAttribute("href"));
                    currentDialogue = dialogue;


                    openBanner();



                });
            }
        }
        function openBanner() {
            var animation = new AnimationManager();
            animation.queue = [{
                  'element': bannerContainer,
                  'className': ['is-hidden']
                },
                {
                  'element': currentDialogue,
                  'className': ['is-hidden', 'dialogue-in'],
                  'nextOn': 'animationend'
                },
                {
                  'element': currentDialogue,
                  'className': ['dialogue-in','banner-out'],
                  'classAfter': ['is-hidden', 'banner-out'],
                  'nextOn': 'animationend'
                },
                {
                  'element': bannerContainer,
                  'className': ['dialogue-container-out'],
                  'classAfter': ['is-hidden', 'dialogue-container-out'],
                  'nextOn': 'animationend'
                }

            ];
            animation.play();
        }
        
        function initDialogueLayout() {
            // add click handlers for .dialogue-display menu items.
            var dialogueElem = document.querySelectorAll(".dialogue-display");
            for (var i = 0, length = dialogueElem.length; i < length; i++) {
                dialogueElem[i].addEventListener('click', function(e) {
                    e.preventDefault();
                    var dialogue = document.querySelector(this.getAttribute("href"));
                    currentDialogue = dialogue;
                    openDialogue();
                });
            }
        };

        function initDialogueButtons() {
            //  clicking any .dialogue-button will close open dialogue.
            var dialogueButtonElem = document.querySelectorAll(".dialogue-button");
            for (var i = 0, length = dialogueButtonElem.length; i < length; i++) {
                var el = dialogueButtonElem[i];
                el.addEventListener("click", function(e) {
                    e.preventDefault();
                    closeDialogue();
                });
            }
        }
        function openDialogue() {
            var animation = new AnimationManager();
            animation.queue = [{
                  'element': dialogueContainer,
                  'className': ['is-hidden', 'dialogue-container-in'],
                  'nextOn': 'animationend'
                },
                {
                  'element': currentDialogue,
                  'className': ['is-hidden', 'dialogue-in'],
                  'nextOn': 'animationend'
                }
            ];
            animation.play();
        }

        function closeDialogue() {
            if (currentDialogue) {

                var animation = new AnimationManager();

                animation.queue = [
                    {
                      'element': currentDialogue,
                      'className': ['dialogue-in','dialogue-out'],
                      'classAfter': ['is-hidden', 'dialogue-out'],
                      'nextOn': 'animationend'
                    },
                    {
                      'element': dialogueContainer,
                      'className': ['dialogue-container-in','dialogue-container-out'],
                      'classAfter': ['is-hidden', 'dialogue-container-out'],
                      'nextOn': 'animationend'
                    }
                ];
                animation.play();
            }
        }
    };

    function initStylemenu() {
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

        // Reload content
        var reload = document.querySelector("#reload");
        if (reload) {
            reload.onclick = function () {
                location.reload(true);
            };
        }

        // theme switch
        var currentTheme = 'theme-settings';
        var themeToggles = document.querySelectorAll('.sg-switch-theme');
        for (var i = 0, length = themeToggles.length; i < length; i++) {
            var toggle = themeToggles[i];
            toggle.addEventListener('click', function(e) {
                toggleTheme(this.value);
            })
        }

        function toggleTheme(themeName) {
            document.body.classList.remove(currentTheme);

            if (themeName !== 'default') {
                document.body.classList.add(themeName);
                currentTheme = themeName;
            }
            
        }


    }

    function initSpinner() {
        var spinner = document.querySelector('.spinner');
        var spinnerButton = document.querySelector('#spinner-toggle');
        
        
    }

    function initRange() {
        var handle = document.querySelector('.input-range-handle');
        
        handle.addEventListener('mousedown', function() {
            document.querySelector('.input-range-label').classList.add('input-range-label-active');
        });

        handle.addEventListener('mouseup', function() {
            document.querySelector('.input-range-label').classList.remove('input-range-label-active');
        });

        

    }



    //  HELPERS
    //  animation manager
    var AnimationManager = function() {
        this.queue = [];
    }
    AnimationManager.prototype.play = function() {
      var that = this;
      var item = that.getItem();
        if (item) {
            
            // after
            if (item.nextOn !== undefined) {
                item.element.addEventListener(item.nextOn, function handleEvent() {
                    this.removeEventListener(item.nextOn, handleEvent, true);

                    if (item.classAfter) {
                        item.classAfter.forEach(function(className) {
                            item.element.classList.toggle(className);
                        });
                    }
                    that.play();
                }, true);
            } else {
                that.play();
            }
            // before
            item.className.forEach(function(className) {
                item.element.classList.toggle(className);
            });
        
            
        } else {
          if(typeof that.oncomplete == 'function') {
              that.oncomplete();
          }
        }
    }
    AnimationManager.prototype.getItem = function() {
        if (this.queue.length > 0) {
        var item = this.queue[0];
        this.queue = this.queue.slice(1,this.queue.length);
        return item;
      } else return false;
    }

    function init() {
        initAppinstall();
        initStylemenu();
        initMenus();
        initTabs();
        initDialogues();
        initSpinner();
        initRange();
    }
    init();
};



// onload
(function() {
    Styleapp();
})();



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