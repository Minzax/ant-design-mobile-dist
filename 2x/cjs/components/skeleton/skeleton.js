"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkeletonTitle = exports.SkeletonParagraph = exports.Skeleton = void 0;

var _react = _interopRequireDefault(require("react"));

var _nativeProps = require("../../utils/native-props");

var _classnames = _interopRequireDefault(require("classnames"));

var _generateIntArray = require("../../utils/generate-int-array");

var _withDefaultProps = require("../../utils/with-default-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classPrefix = 'adm-skeleton';

var Skeleton = function Skeleton(props) {
  var _classNames;

  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(classPrefix, (_classNames = {}, _classNames[classPrefix + "-animated"] = props.animated, _classNames))
  }));
};

exports.Skeleton = Skeleton;

var SkeletonTitle = function SkeletonTitle(props) {
  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement(Skeleton, {
    animated: props.animated,
    className: classPrefix + "-title"
  }));
};

exports.SkeletonTitle = SkeletonTitle;
var defaultSkeletonParagraphProps = {
  lineCount: 3
};

var SkeletonParagraph = function SkeletonParagraph(p) {
  var props = (0, _withDefaultProps.mergeProps)(defaultSkeletonParagraphProps, p);
  var keys = (0, _generateIntArray.generateIntArray)(1, props.lineCount);

  var node = /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-paragraph"
  }, keys.map(function (key) {
    return /*#__PURE__*/_react["default"].createElement(Skeleton, {
      key: key,
      animated: props.animated,
      className: classPrefix + "-paragraph-line"
    });
  }));

  return (0, _nativeProps.withNativeProps)(props, node);
};

exports.SkeletonParagraph = SkeletonParagraph;