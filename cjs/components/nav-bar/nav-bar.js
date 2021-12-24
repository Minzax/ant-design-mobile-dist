"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavBar = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _antdMobileIcons = require("antd-mobile-icons");

var _nativeProps = require("../../utils/native-props");

var _withDefaultProps = require("../../utils/with-default-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classPrefix = "adm-nav-bar";
var defaultProps = {
  back: '',
  backArrow: true
};

var NavBar = function NavBar(p) {
  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  var back = props.back,
      backArrow = props.backArrow;
  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(classPrefix)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-left",
    role: 'button'
  }, back !== null && /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-back",
    onClick: props.onBack
  }, backArrow && /*#__PURE__*/_react["default"].createElement("span", {
    className: classPrefix + "-back-arrow"
  }, backArrow === true ? /*#__PURE__*/_react["default"].createElement(_antdMobileIcons.LeftOutline, null) : backArrow), /*#__PURE__*/_react["default"].createElement("span", {
    "aria-hidden": 'true'
  }, back)), props.left), /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-title"
  }, props.children), /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-right"
  }, props.right)));
};

exports.NavBar = NavBar;