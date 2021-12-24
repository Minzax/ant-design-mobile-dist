"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMutationEffect = useMutationEffect;

var _react = require("react");

var _ahooks = require("ahooks");

function useMutationEffect(effect, targetRef, options) {
  var fn = (0, _ahooks.usePersistFn)(effect);
  (0, _react.useEffect)(function () {
    var observer = new MutationObserver(function () {
      fn();
    });
    if (!targetRef.current) return;
    observer.observe(targetRef.current, options);
    return function () {
      observer.disconnect();
    };
  }, [targetRef]);
}