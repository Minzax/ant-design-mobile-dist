"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorBlock = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _error = require("./error");

var _withDefaultProps = require("../../utils/with-default-props");

var _nativeProps = require("../../utils/native-props");

var _configProvider = require("../config-provider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classPrefix = "adm-error-block";
var defaultProps = {
  status: 'default'
};

var ErrorBlock = function ErrorBlock(p) {
  var _classNames;

  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  var icon = _error.iconRecord[props.status];

  var _useConfig = (0, _configProvider.useConfig)(),
      locale = _useConfig.locale;

  var contentPack = locale.ErrorBlock[props.status];
  var des = 'description' in props ? props.description : contentPack.description;
  var title = 'title' in props ? props.title : contentPack.title;

  var imageNode = /*#__PURE__*/_react["default"].createElement("img", {
    src: icon
  });

  if (props.image) {
    if (typeof props.image === 'string') {
      imageNode = /*#__PURE__*/_react["default"].createElement("img", {
        src: props.image
      });
    } else {
      imageNode = props.image;
    }
  }

  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(classPrefix, (_classNames = {}, _classNames[classPrefix + "-full-page"] = props.fullPage, _classNames))
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-image"
  }, imageNode), /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-description"
  }, title && /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-description-title"
  }, title), des && /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-description-subtitle"
  }, des)), props.children && /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-content"
  }, props.children)));
};

exports.ErrorBlock = ErrorBlock;