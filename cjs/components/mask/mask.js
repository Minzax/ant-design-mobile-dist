"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mask = void 0;

var _nativeProps = require("../../utils/native-props");

var _react = _interopRequireWildcard(require("react"));

var _ahooks = require("ahooks");

var _useLockScroll = require("../../utils/use-lock-scroll");

var _web = require("@react-spring/web");

var _renderToContainer = require("../../utils/render-to-container");

var _withDefaultProps = require("../../utils/with-default-props");

var _configProvider = require("../config-provider");

var _useShouldRender = require("../../utils/use-should-render");

var _withStopPropagation = require("../../utils/with-stop-propagation");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var classPrefix = "adm-mask";
var opacityRecord = {
  "default": 0.55,
  thin: 0.35,
  thick: 0.75
};
var defaultProps = {
  visible: true,
  destroyOnClose: false,
  forceRender: false,
  color: 'black',
  opacity: 'default',
  disableBodyScroll: true,
  getContainer: null,
  stopPropagation: ['click']
};

var Mask = function Mask(p) {
  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);

  var _useConfig = (0, _configProvider.useConfig)(),
      locale = _useConfig.locale;

  var ref = (0, _react.useRef)(null);
  (0, _useLockScroll.useLockScroll)(ref, props.visible && props.disableBodyScroll);
  var background = (0, _react.useMemo)(function () {
    var _a;

    var opacity = (_a = opacityRecord[props.opacity]) !== null && _a !== void 0 ? _a : props.opacity;
    var rgb = props.color === 'white' ? '255, 255, 255' : '0, 0, 0';
    return "rgba(" + rgb + ", " + opacity + ")";
  }, [props.color, props.opacity]);

  var _useState = (0, _react.useState)(props.visible),
      active = _useState[0],
      setActive = _useState[1];

  var unmountedRef = (0, _ahooks.useUnmountedRef)();

  var _useSpring = (0, _web.useSpring)({
    opacity: props.visible ? 1 : 0,
    config: {
      precision: 0.01,
      mass: 1,
      tension: 200,
      friction: 30,
      clamp: true
    },
    onStart: function onStart() {
      setActive(true);
    },
    onRest: function onRest() {
      var _a, _b;

      if (unmountedRef.current) return;
      setActive(props.visible);

      if (props.visible) {
        (_a = props.afterShow) === null || _a === void 0 ? void 0 : _a.call(props);
      } else {
        (_b = props.afterClose) === null || _b === void 0 ? void 0 : _b.call(props);
      }
    }
  }),
      opacity = _useSpring.opacity;

  var shouldRender = (0, _useShouldRender.useShouldRender)(active, props.forceRender, props.destroyOnClose);
  var node = (0, _withStopPropagation.withStopPropagation)(props.stopPropagation, (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement(_web.animated.div, {
    className: classPrefix,
    ref: ref,
    style: Object.assign(Object.assign({
      background: background,
      opacity: opacity
    }, props.style), {
      display: active ? 'unset' : 'none'
    })
  }, props.onMaskClick && /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-aria-button",
    role: 'button',
    "aria-label": locale.Mask.name,
    onClick: props.onMaskClick
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-content"
  }, shouldRender && props.children))));
  return (0, _renderToContainer.renderToContainer)(props.getContainer, node);
};

exports.Mask = Mask;