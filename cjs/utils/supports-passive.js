"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supportsPassive = void 0;

var _canUseDom = require("./can-use-dom");

var supportsPassive = false;
exports.supportsPassive = supportsPassive;

if (_canUseDom.canUseDom) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        exports.supportsPassive = supportsPassive = true;
      }
    });
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}