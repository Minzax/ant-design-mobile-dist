"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoCenter = void 0;

var _react = _interopRequireDefault(require("react"));

var _nativeProps = require("../../utils/native-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classPrefix = 'adm-auto-center';

var AutoCenter = function AutoCenter(props) {
  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-content"
  }, props.children)));
};

exports.AutoCenter = AutoCenter;