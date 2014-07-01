(function(define){define(function(require,exports,module){
'use strict';

/**
 * Dependencies
 */

var componentUtils = require('gaia-component-utils');

/**
 * Locals
 */

var packagesBaseUrl = window.packagesBaseUrl || '/bower_components/';
var baseUrl = window.GaiaHeaderBaseUrl || packagesBaseUrl + 'gaia-header/';

// Extend from the HTMLElement prototype
var proto = Object.create(HTMLElement.prototype);

/**
 * Supported action types
 *
 * @type {Object}
 */
var actionTypes = {
  menu: true,
  back: true,
  close: true
};

var stylesheets = [
  { url: packagesBaseUrl + 'gaia-icons/style.css' },
  { url: baseUrl + 'style.css', scoped: true }
];

/**
 * Called when the element is first created.
 *
 * Here we create the shadow-root and
 * inject our template into it.
 *
 * @private
 */
proto.createdCallback = function() {
  var shadow = this.createShadowRoot();

  this._template = template.content.cloneNode(true);
  this._actionButton = this._template.getElementById('header-nav');
  this._header = this._template.getElementById('header');
  this._configureActionButton();
  this._actionButton.addEventListener(
    'click', proto._onActionButtonClick.bind(this)
  );

  shadow.appendChild(this._template);
  componentUtils.style.call(this, stylesheets);
};

/**
 * Called when one of the attributes on the element changes.
 *
 * @private
 */
proto.attributeChangedCallback = function(attr, oldVal, newVal) {
  if (attr === 'action') {
    this._configureActionButton();
  }
};

/**
 * When called, trigger the action button.
 */
proto.triggerAction = function() {
  if (this._isSupportedAction(this.getAttribute('action'))) {
    this._actionButton.click();
  }
};

/**
 * Configure the action button based
 * on the value of the `data-action`
 * attribute.
 *
 * @private
 */
proto._configureActionButton = function() {
  var old = this._actionButton.getAttribute('icon');
  var type = this.getAttribute('action');

  // TODO: Action button should be
  // hidden by default then shown
  // only with supported action types
  if (!this._isSupportedAction(type)) {
    this._actionButton.style.display = 'none';
    return;
  }

  this._actionButton.style.display = 'block';
  this._actionButton.setAttribute('icon', type);
  this._actionButton.classList.remove('icon-' + old);
  this._actionButton.classList.add('icon-' + type);

  console.log(old, type);
};

/**
 * Validate action against supported list.
 *
 * @private
 */
proto._isSupportedAction = function(action) {
  return action && actionTypes[action];
};

/**
 * Handle clicks on the action button.
 *
 * Fired async to allow the 'click' event
 * to finish its event path before
 * dispatching the 'action' event.
 *
 * @param  {Event} e
 * @private
 */
proto._onActionButtonClick = function(e) {
  var config = { detail: { type: this.getAttribute('action') } };
  var actionEvent = new CustomEvent('action', config);
  setTimeout(this.dispatchEvent.bind(this, actionEvent));
};

// HACK: Create a <template> in memory at runtime.
// When the custom-element is created we clone
// this template and inject into the shadow-root.
// Prior to this we would have had to copy/paste
// the template into the <head> of every app that
// wanted to use <gaia-header>, this would make
// markup changes complicated, and could lead to
// things getting out of sync. This is a short-term
// hack until we can import entire custom-elements
// using HTML Imports (bug 877072).
var template = document.createElement('template');
template.innerHTML = '<header>' +
    '<button id="header-nav" class="action-button icon"></button>' +
    '<content select="h1,h2,h3,h4"></content>' +
    '<content id="buttons-content" select="button,a"></content>' +
    
  '</header>';

// Register and return the constructor
module.exports = document.registerElement('gaia-header', { prototype: proto });

});})((function(n,w){return typeof define=='function'&&define.amd?
define:typeof module=='object'?function(c){c(require,exports,module);}:function(c){
var m={exports:{}},r=function(n){return w[n];};w[n]=c(r,m.exports,m)||m.exports;};})('gaia-header',this));