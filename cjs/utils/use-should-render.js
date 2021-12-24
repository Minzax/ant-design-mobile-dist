"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useShouldRender = useShouldRender;

var _useInitialized = require("./use-initialized");

function useShouldRender(active, forceRender, destroyOnClose) {
  var initialized = (0, _useInitialized.useInitialized)(active);
  if (forceRender) return true;
  if (active) return true;
  if (!initialized) return false;
  return !destroyOnClose;
}