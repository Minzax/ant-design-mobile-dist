"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRefState = useRefState;

var _react = require("react");

function useRefState(initialState) {
  var _useState = (0, _react.useState)(initialState),
      state = _useState[0],
      setState = _useState[1];

  var ref = (0, _react.useRef)(state);
  (0, _react.useLayoutEffect)(function () {
    ref.current = state;
  }, [state]);
  return [state, setState, ref];
}