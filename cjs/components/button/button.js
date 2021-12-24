"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _loading = _interopRequireDefault(require("../loading"));

var _withDefaultProps = require("../../utils/with-default-props");

var _nativeProps = require("../../utils/native-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classPrefix = "adm-button";
var defaultProps = {
  color: 'default',
  fill: 'solid',
  block: false,
  loading: false,
  type: 'button',
  shape: 'default',
  size: 'middle'
};

var Button = function Button(p) {
  var _classNames;

  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  var disabled = props.disabled || props.loading;
  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("button", {
    type: props.type,
    onClick: props.onClick,
    className: (0, _classnames["default"])(classPrefix, props.color ? classPrefix + "-" + props.color : null, (_classNames = {}, _classNames[classPrefix + "-block"] = props.block, _classNames[classPrefix + "-disabled"] = disabled, _classNames[classPrefix + "-fill-outline"] = props.fill === 'outline', _classNames[classPrefix + "-fill-none"] = props.fill === 'none', _classNames[classPrefix + "-mini"] = props.size === 'mini', _classNames[classPrefix + "-small"] = props.size === 'small', _classNames[classPrefix + "-large"] = props.size === 'large', _classNames[classPrefix + "-loading"] = props.loading, _classNames), classPrefix + "-shape-" + props.shape),
    disabled: disabled
  }, props.loading ? /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-loading-wrapper"
  }, /*#__PURE__*/_react["default"].createElement(_loading["default"], {
    color: 'currentColor'
  }), props.loadingText) : props.children));
};

exports.Button = Button;