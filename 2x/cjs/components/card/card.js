"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Card = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _nativeProps = require("../../utils/native-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classPrefix = "adm-card";

var Card = function Card(props) {
  var renderHeader = function renderHeader() {
    if (!(props.title || props.extra)) {
      return null;
    }

    return /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames["default"])(classPrefix + "-header", props.headerClassName),
      style: props.headerStyle,
      onClick: props.onHeaderClick
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: classPrefix + "-header-title"
    }, props.title), props.extra);
  };

  var renderBody = function renderBody() {
    if (!props.children) {
      return null;
    }

    return /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames["default"])(classPrefix + "-body", props.bodyClassName),
      style: props.bodyStyle,
      onClick: props.onBodyClick
    }, props.children);
  };

  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix,
    onClick: props.onClick
  }, renderHeader(), renderBody()));
};

exports.Card = Card;