"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListItem = void 0;

var _react = _interopRequireDefault(require("react"));

var _nativeProps = require("../../utils/native-props");

var _antdMobileIcons = require("antd-mobile-icons");

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classPrefix = "adm-list-item";

var ListItem = function ListItem(props) {
  var _a;

  var clickable = (_a = props.clickable) !== null && _a !== void 0 ? _a : !!props.onClick;
  var arrow = props.arrow === undefined ? clickable : props.arrow;

  var content = /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-content"
  }, props.prefix && /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-content-prefix"
  }, props.prefix), /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-content-main"
  }, props.title && /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-title"
  }, props.title), props.children, props.description && /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-description"
  }, props.description)), props.extra && /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-content-extra"
  }, props.extra), arrow && /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-content-arrow"
  }, arrow === true ? /*#__PURE__*/_react["default"].createElement(_antdMobileIcons.RightOutline, null) : arrow));

  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement(clickable ? 'a' : 'div', {
    className: (0, _classnames["default"])("" + classPrefix, clickable ? ['adm-plain-anchor'] : [], props.disabled && classPrefix + "-disabled"),
    onClick: props.disabled ? undefined : props.onClick
  }, content));
};

exports.ListItem = ListItem;