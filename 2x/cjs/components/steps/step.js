"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Step = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _nativeProps = require("../../utils/native-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classPrefix = "adm-step";

var Step = function Step(props) {
  var title = props.title,
      description = props.description,
      icon = props.icon,
      _props$status = props.status,
      status = _props$status === void 0 ? 'wait' : _props$status;
  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])("" + classPrefix, classPrefix + "-status-" + status)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-indicator"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-icon-container"
  }, icon)), /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-content"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-title"
  }, title), !!description && /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-description"
  }, description))));
};

exports.Step = Step;