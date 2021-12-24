"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Result = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _antdMobileIcons = require("antd-mobile-icons");

var _nativeProps = require("../../utils/native-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classPrefix = "adm-result";
var iconRecord = {
  success: _antdMobileIcons.CheckCircleFill,
  error: _antdMobileIcons.CloseCircleFill,
  info: _antdMobileIcons.InformationCircleFill,
  waiting: _antdMobileIcons.ClockCircleFill,
  warning: _antdMobileIcons.ExclamationCircleFill
};

var Result = function Result(props) {
  var status = props.status,
      title = props.title,
      description = props.description,
      icon = props.icon;
  if (!status) return null;

  var resultIcon = icon || /*#__PURE__*/_react["default"].createElement(iconRecord[status]);

  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(classPrefix, classPrefix + "-" + status)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-icon"
  }, resultIcon), /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-title"
  }, title), description ? /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-description"
  }, description) : null));
};

exports.Result = Result;