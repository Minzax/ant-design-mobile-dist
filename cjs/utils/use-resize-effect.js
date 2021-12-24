"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useResizeEffect = useResizeEffect;

var _react = require("react");

var _ahooks = require("ahooks");

function useResizeEffect(effect, targetRef) {
  var fn = (0, _ahooks.usePersistFn)(effect);
  (0, _react.useLayoutEffect)(function () {
    var target = targetRef.current;
    if (!target) return;

    if (window.ResizeObserver) {
      var observer = new ResizeObserver(function () {
        fn(target);
      });
      observer.observe(target);
      return function () {
        observer.disconnect();
      };
    } else {
      fn(target);
    }
  }, [targetRef]);
}