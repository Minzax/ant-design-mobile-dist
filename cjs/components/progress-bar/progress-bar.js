"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressBar = void 0;

var _react = _interopRequireDefault(require("react"));

var _nativeProps = require("../../utils/native-props");

var _withDefaultProps = require("../../utils/with-default-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classPrefix = "adm-progress-bar";

var ProgressBar = function ProgressBar(p) {
  var props = (0, _withDefaultProps.mergeProps)({
    percent: 0
  }, p);
  var fillStyle = {
    width: props.percent + "%"
  };
  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-trail"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-fill",
    style: fillStyle
  }))));
};

exports.ProgressBar = ProgressBar;