"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dot = exports.Badge = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _nativeProps = require("../../utils/native-props");

var _withDefaultProps = require("../../utils/with-default-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classPrefix = "adm-badge";
var dot = Symbol();
exports.dot = dot;

var Badge = function Badge(p) {
  var _classNames;

  var props = (0, _withDefaultProps.mergeProps)({
    color: '#FF411C'
  }, p);
  var content = props.content,
      color = props.color,
      children = props.children;
  var isDot = content === dot;
  var badgeCls = (0, _classnames["default"])(classPrefix, (_classNames = {}, _classNames[classPrefix + "-fixed"] = !!children, _classNames[classPrefix + "-dot"] = isDot, _classNames));
  var element = content ? (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: badgeCls,
    style: {
      backgroundColor: color
    }
  }, !isDot && content)) : null;
  return children ? /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-wrap"
  }, children, element) : element;
};

exports.Badge = Badge;