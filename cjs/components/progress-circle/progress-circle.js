"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressCircle = void 0;

var _react = _interopRequireDefault(require("react"));

var _nativeProps = require("../../utils/native-props");

var _withDefaultProps = require("../../utils/with-default-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classPrefix = "adm-progress-circle";

var ProgressCircle = function ProgressCircle(p) {
  var props = (0, _withDefaultProps.mergeProps)({
    percent: 0,
    strokeColor: '#1677FF'
  }, p);
  var style = {
    '--percent': props.percent.toString()
  };
  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: "" + classPrefix,
    style: style
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-content"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: classPrefix + "-svg"
  }, /*#__PURE__*/_react["default"].createElement("circle", {
    className: classPrefix + "-track",
    fill: 'transparent'
  }), /*#__PURE__*/_react["default"].createElement("circle", {
    className: classPrefix + "-fill",
    fill: 'transparent'
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-info"
  }, props.children))));
};

exports.ProgressCircle = ProgressCircle;