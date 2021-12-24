"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridItem = exports.Grid = void 0;

var _withDefaultProps = require("../../utils/with-default-props");

var _react = _interopRequireDefault(require("react"));

var _nativeProps = require("../../utils/native-props");

var _toCssLength = require("../../utils/to-css-length");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classPrefix = "adm-grid";

var Grid = function Grid(props) {
  var style = {
    '--columns': props.columns.toString()
  };
  var gap = props.gap;

  if (gap !== undefined) {
    if (Array.isArray(gap)) {
      style['--gap-horizontal'] = (0, _toCssLength.toCSSLength)(gap[0]);
      style['--gap-vertical'] = (0, _toCssLength.toCSSLength)(gap[1]);
    } else {
      style['--gap'] = (0, _toCssLength.toCSSLength)(gap);
    }
  }

  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix,
    style: style
  }, props.children));
};

exports.Grid = Grid;

var GridItem = function GridItem(p) {
  var props = (0, _withDefaultProps.mergeProps)({
    span: 1
  }, p);
  var itemStyle = {
    '--item-span': props.span
  };
  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-item",
    style: itemStyle,
    onClick: props.onClick
  }, props.children));
};

exports.GridItem = GridItem;