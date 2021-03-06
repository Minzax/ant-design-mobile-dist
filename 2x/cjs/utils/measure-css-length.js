"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.measureCSSLength = measureCSSLength;

var _isDev = require("./is-dev");

var _devLog = require("./dev-log");

function measureCSSLength(raw) {
  if (raw === null || raw === undefined) {
    if (_isDev.isDev) {
      (0, _devLog.devError)('Global', 'Seems like the you will encounter a style messed problem. Please check the browser environment to make sure it supports CSS variables.');
    }

    return 0;
  }

  const withUnit = raw.trim();

  if (withUnit.endsWith('px')) {
    return parseFloat(withUnit);
  } else if (withUnit.endsWith('rem')) {
    return parseFloat(withUnit) * parseFloat(window.getComputedStyle(document.documentElement).fontSize);
  } else if (withUnit.endsWith('vw')) {
    return parseFloat(withUnit) * window.innerWidth / 100;
  } else {
    if (_isDev.isDev) {
      (0, _devLog.devError)('Global', 'You are using a not supported CSS unit. Only `px` `rem` and `vw` are supported.');
    }

    return 0;
  }
}