"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Space = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _nativeProps = require("../../utils/native-props");

var _withDefaultProps = require("../../utils/with-default-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classPrefix = "adm-space";
var defaultProps = {
  direction: 'horizontal'
};

var Space = function Space(p) {
  var _classNames;

  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  var direction = props.direction,
      onClick = props.onClick;
  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(classPrefix, (_classNames = {}, _classNames[classPrefix + "-wrap"] = props.wrap, _classNames[classPrefix + "-block"] = props.block, _classNames[classPrefix + "-" + direction] = true, _classNames[classPrefix + "-align-" + props.align] = !!props.align, _classNames[classPrefix + "-justify-" + props.justify] = !!props.justify, _classNames)),
    onClick: onClick
  }, _react["default"].Children.map(props.children, function (child) {
    return child !== null && child !== undefined && /*#__PURE__*/_react["default"].createElement("div", {
      className: classPrefix + "-item"
    }, child);
  })));
};

exports.Space = Space;