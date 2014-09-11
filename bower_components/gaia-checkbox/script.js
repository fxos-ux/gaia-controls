(function(define){define(function(require,exports,module){
'use strict';

/**
 * Dependencies
 */

var utils = require('gaia-component-utils');

/**
 * Locals
 */

var packagesBaseUrl = window.packagesBaseUrl || '/bower_components/';
var baseUrl = window.GaiaCheckboxBaseUrl || packagesBaseUrl + 'gaia-checkbox/';
var stylesheets = [
  { url: packagesBaseUrl + 'gaia-icons/style.css' },
  { url: baseUrl + 'style.css', scoped: true }
];

/**
 * Prototype extends from
 * the HTMLElement.
 *
 * @type {Object}
 */
var proto = Object.create(HTMLElement.prototype);

/**
 * Attributes supported
 * by this component.
 *
 * @type {Object}
 */
proto.attrs = {
  checked: true,
  danger: true,
  name: true
};

proto.createdCallback = function() {
  var tmpl = template.content.cloneNode(true);
  var shadow = this.createShadowRoot();

  this.inner = tmpl.getElementById('inner');
  this.inner.addEventListener('click', this.onClick.bind(this), false);

  // Setup initial attributes
  this.checked = this.getAttribute('checked');
  this.danger = this.getAttribute('danger');
  this.name = this.getAttribute('name');

  shadow.appendChild(tmpl);
  utils.style.call(this, stylesheets);

  // Bind label listeners in the next turn
  // to make sure that HTML has been parsed.
  setTimeout(this.bindLabels.bind(this));
};

proto.bindLabels = function() {
  if (!this.id) { return; }
  var fn = this.onClick.bind(this);
  var selector = 'label[for="' + this.id + '"]';
  var els = document.querySelectorAll(selector);
  [].forEach.call(els, function(el) { el.addEventListener('click', fn); });
};

proto.attributeChangedCallback = function(name, from, to) {
  if (this.attrs[name]) { this[name] = to; }
};

proto.onClick = function(e) {
  this.checked = !this.checked;

  // Dispatch a click event to any listeners to the app.
  // We should be able to remove this when bug 887541 lands.
  this.dispatchEvent(new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  }));
};

proto.toggle = function(value) {
  value = arguments.length ? value : !this.checked;
  if (value || value === '') { this.check(); }
  else { this.uncheck(); }
};

proto.check = function() {
  if (this.checked) { return; }
  this.inner.setAttribute('checked', '');
  this.setAttribute('checked', '');
  this._checked = true;
};

proto.uncheck = function() {
  if (!this.checked) { return; }
  this.inner.removeAttribute('checked');
  this.removeAttribute('checked');
  this._checked = false;
};

Object.defineProperties(proto, {
  checked: {
    get: function() { return !!this._checked; },
    set: proto.toggle
  },
  danger: {
    get: function() { return this._danger; },
    set: function(value) {
      if (value || value === '') { this.inner.setAttribute('danger', value); }
      else { this.inner.removeAttribute('danger'); }
      this._danger = value;
    }
  },
  name: {
    get: function() { return this._name; },
    set: function(value) {
      if (value === null) { this.inner.removeAttribute('name'); }
      else { this.inner.setAttribute('name', value); }
      this._name = value;
    }
  }
});

var template = document.createElement('template');
template.innerHTML = '<button class="inner" id="inner">' +
    '<div class="icon-active"></div>' +
    '<div class="icon-tick"><a href="#tick" id="tick" data-icon="tick"></a></div>' +
  '</button>';

// Register and return the constructor
module.exports = document.registerElement('gaia-checkbox', { prototype: proto });

});})((function(n,w){return typeof define=='function'&&define.amd?
define:typeof module=='object'?function(c){c(require,exports,module);}:function(c){
var m={exports:{}},r=function(n){return w[n];};w[n]=c(r,m.exports,m)||m.exports;};})('gaia-checkbox',this));