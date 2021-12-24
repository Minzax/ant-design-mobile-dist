"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiImageViewer = exports.ImageViewer = void 0;

var _react = _interopRequireDefault(require("react"));

var _withDefaultProps = require("../../utils/with-default-props");

var _renderToContainer = require("../../utils/render-to-container");

var _mask = _interopRequireDefault(require("../mask"));

var _slide = require("./slide");

var _slides = require("./slides");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classPrefix = "adm-image-viewer";
var defaultProps = {
  maxZoom: 3,
  getContainer: null,
  visible: false
};

var ImageViewer = function ImageViewer(p) {
  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);

  var node = /*#__PURE__*/_react["default"].createElement(_mask["default"], {
    visible: props.visible,
    disableBodyScroll: false,
    opacity: 'thick',
    afterClose: props.afterClose
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-content"
  }, props.image && /*#__PURE__*/_react["default"].createElement(_slide.Slide, {
    image: props.image,
    onTap: function onTap() {
      var _a;

      (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
    },
    maxZoom: props.maxZoom
  })));

  return (0, _renderToContainer.renderToContainer)(props.getContainer, node);
};

exports.ImageViewer = ImageViewer;
var multiDefaultProps = Object.assign(Object.assign({}, defaultProps), {
  defaultIndex: 0
});

var MultiImageViewer = function MultiImageViewer(p) {
  var props = (0, _withDefaultProps.mergeProps)(multiDefaultProps, p);

  var node = /*#__PURE__*/_react["default"].createElement(_mask["default"], {
    visible: props.visible,
    disableBodyScroll: false,
    opacity: 'thick',
    afterClose: props.afterClose
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-content"
  }, props.images && /*#__PURE__*/_react["default"].createElement(_slides.Slides, {
    defaultIndex: props.defaultIndex,
    onIndexChange: props.onIndexChange,
    images: props.images,
    onTap: function onTap() {
      var _a;

      (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
    },
    maxZoom: props.maxZoom
  })));

  return (0, _renderToContainer.renderToContainer)(props.getContainer, node);
};

exports.MultiImageViewer = MultiImageViewer;