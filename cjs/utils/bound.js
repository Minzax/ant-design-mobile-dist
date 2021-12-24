"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bound = bound;

function bound(position, min, max) {
  var ret = position;

  if (min !== undefined) {
    ret = Math.max(position, min);
  }

  if (max !== undefined) {
    ret = Math.min(ret, max);
  }

  return ret;
}