(function(define){define(function(require,exports,module){
'use strict';

var utils = require('gaia-component-utils');

// Extend from the HTMLElement prototype
var proto = Object.create(HTMLElement.prototype);


// Allow baseurl to be overridden (used for demo page)
var packagesBaseUrl = window.packagesBaseUrl || '/bower_components/';
var baseUrl = window.GaiaButtonBaseUrl || packagesBaseUrl + 'gaia-button/';

var stylesheets = [
  { url: baseUrl + 'style.css', scoped: true }
];

proto.createdCallback = function() {
  utils.style.call(this, stylesheets);
};

return document.registerElement('gaia-button', { prototype: proto });



});})((function(n,w){return typeof define=='function'&&define.amd?
define:typeof module=='object'?function(c){c(require,exports,module);}:function(c){
var m={exports:{}},r=function(n){return w[n];};w[n]=c(r,m.exports,m)||m.exports;};})('gaia-button',this));