"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _nativeProps = require("../../utils/native-props");

var _withDefaultProps = require("../../utils/with-default-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classPrefix = "adm-list";
var defaultProps = {
  mode: 'default'
};

var List = function List(p) {
  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(classPrefix, classPrefix + "-" + props.mode)
  }, props.children));
};

exports.List = List;