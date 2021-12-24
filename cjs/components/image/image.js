"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Image = void 0;

var _withDefaultProps = require("../../utils/with-default-props");

var _react = _interopRequireWildcard(require("react"));

var _nativeProps = require("../../utils/native-props");

var _antdMobileIcons = require("antd-mobile-icons");

var _stagedComponents = require("staged-components");

var _toCssLength = require("../../utils/to-css-length");

var _lazyDetector = require("./lazy-detector");

var _ahooks = require("ahooks");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var classPrefix = "adm-image";
var defaultProps = {
  fit: 'fill',
  placeholder: /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-tip"
  }, /*#__PURE__*/_react["default"].createElement(_antdMobileIcons.PictureOutline, null)),
  fallback: /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-tip"
  }, /*#__PURE__*/_react["default"].createElement(_antdMobileIcons.PictureWrongOutline, null)),
  lazy: false
};
var Image = (0, _stagedComponents.staged)(function (p) {
  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);

  var _useState = (0, _react.useState)(false),
      loaded = _useState[0],
      setLoaded = _useState[1];

  var _useState2 = (0, _react.useState)(false),
      failed = _useState2[0],
      setFailed = _useState2[1];

  var ref = (0, _react.useRef)(null);
  var src = props.src;
  var srcSet = props.srcSet;

  var _useState3 = (0, _react.useState)(!props.lazy),
      initialized = _useState3[0],
      setInitialized = _useState3[1];

  src = initialized ? props.src : undefined;
  srcSet = initialized ? props.srcSet : undefined;
  (0, _ahooks.useUpdateLayoutEffect)(function () {
    setLoaded(false);
    setFailed(false);
  }, [src]);

  function renderInner() {
    if (failed) {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, props.fallback);
    }

    var img = /*#__PURE__*/_react["default"].createElement("img", {
      className: classPrefix + "-img",
      src: src,
      alt: props.alt,
      onClick: props.onClick,
      onLoad: function onLoad() {
        setLoaded(true);
      },
      onError: function onError(e) {
        var _a;

        setFailed(true);
        (_a = props.onError) === null || _a === void 0 ? void 0 : _a.call(props, e);
      },
      style: {
        objectFit: props.fit,
        display: loaded ? 'block' : 'none'
      },
      crossOrigin: props.crossOrigin,
      decoding: props.decoding,
      loading: props.loading,
      referrerPolicy: props.referrerPolicy,
      sizes: props.sizes,
      srcSet: srcSet,
      useMap: props.useMap
    });

    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, !loaded && props.placeholder, img);
  }

  var style = {};

  if (props.width) {
    style['--width'] = (0, _toCssLength.toCSSLength)(props.width);
  }

  if (props.height) {
    style['--height'] = (0, _toCssLength.toCSSLength)(props.height);
  }

  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    ref: ref,
    className: classPrefix,
    style: style
  }, props.lazy && !initialized && /*#__PURE__*/_react["default"].createElement(_lazyDetector.LazyDetector, {
    onActive: function onActive() {
      setInitialized(true);
    }
  }), renderInner()));
});
exports.Image = Image;