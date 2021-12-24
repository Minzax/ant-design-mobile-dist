"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePropsValue = usePropsValue;

var _react = require("react");

var _ahooks = require("ahooks");

function usePropsValue(options) {
  var value = options.value,
      defaultValue = options.defaultValue,
      onChange = options.onChange;
  var update = (0, _ahooks.useUpdate)();
  var stateRef = (0, _react.useRef)(value !== undefined ? value : defaultValue);

  if (value !== undefined) {
    stateRef.current = value;
  }

  var setState = (0, _ahooks.usePersistFn)(function (v) {
    if (value === undefined) {
      stateRef.current = v;
      update();
    }

    onChange === null || onChange === void 0 ? void 0 : onChange(v);
  });
  return [stateRef.current, setState];
}