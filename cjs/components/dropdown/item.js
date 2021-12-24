"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ItemChildrenWrap = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _nativeProps = require("../../utils/native-props");

var _useShouldRender = require("../../utils/use-should-render");

var _antdMobileIcons = require("antd-mobile-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classPrefix = "adm-dropdown-item";

var Item = function Item(props) {
  var _classNames, _classNames2;

  var cls = (0, _classnames["default"])(classPrefix, (_classNames = {}, _classNames[classPrefix + "-active"] = props.active, _classNames[classPrefix + "-highlight"] = props.highlight, _classNames));
  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: cls,
    onClick: props.onClick
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-title"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: classPrefix + "-title-text"
  }, props.title), /*#__PURE__*/_react["default"].createElement("span", {
    className: (0, _classnames["default"])(classPrefix + "-title-arrow", (_classNames2 = {}, _classNames2[classPrefix + "-title-arrow-active"] = props.active, _classNames2))
  }, props.arrow === undefined ? /*#__PURE__*/_react["default"].createElement(_antdMobileIcons.DownFill, null) : props.arrow))));
};

var _default = Item;
exports["default"] = _default;

var ItemChildrenWrap = function ItemChildrenWrap(props) {
  var _classNames3;

  var _props$active = props.active,
      active = _props$active === void 0 ? false : _props$active;
  var shouldRender = (0, _useShouldRender.useShouldRender)(active, props.forceRender, props.destroyOnClose);
  var cls = (0, _classnames["default"])(classPrefix + "-content", (_classNames3 = {}, _classNames3[classPrefix + "-content-hidden"] = !active, _classNames3));
  return shouldRender ? /*#__PURE__*/_react["default"].createElement("div", {
    className: cls,
    onClick: props.onClick
  }, props.children) : null;
};

exports.ItemChildrenWrap = ItemChildrenWrap;