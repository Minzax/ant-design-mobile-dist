"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoticeBar = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _antdMobileIcons = require("antd-mobile-icons");

var _ahooks = require("ahooks");

var _withDefaultProps = require("../../utils/with-default-props");

var _nativeProps = require("../../utils/native-props");

var _useResizeEffect = require("../../utils/use-resize-effect");

var _useMutationEffect = require("../../utils/use-mutation-effect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var classPrefix = "adm-notice-bar";
var defaultProps = {
  color: 'default',
  delay: 2000,
  speed: 50
};
var NoticeBar = /*#__PURE__*/(0, _react.memo)(function (p) {
  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  var containerRef = (0, _react.useRef)(null);
  var textRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(true),
      visible = _useState[0],
      setVisible = _useState[1];

  var speed = props.speed;
  var delayLockRef = (0, _react.useRef)(true);
  var animatingRef = (0, _react.useRef)(false);

  function start() {
    if (delayLockRef.current) return;
    var container = containerRef.current;
    var text = textRef.current;
    if (!container || !text) return;

    if (container.offsetWidth >= text.offsetWidth) {
      animatingRef.current = false;
      text.style.removeProperty('transition-duration');
      text.style.removeProperty('transform');
      return;
    }

    if (animatingRef.current) return;
    var initial = !text.style.transform;
    text.style.transitionDuration = '0s';

    if (initial) {
      text.style.transform = 'translateX(0)';
    } else {
      text.style.transform = "translateX(" + container.offsetWidth + "px)";
    }

    var distance = initial ? text.offsetWidth : container.offsetWidth + text.offsetWidth;
    animatingRef.current = true;
    text.style.transitionDuration = Math.round(distance / speed) + "s";
    text.style.transform = "translateX(-" + text.offsetWidth + "px)";
  }

  (0, _ahooks.useTimeout)(function () {
    delayLockRef.current = false;
    start();
  }, props.delay);
  (0, _useResizeEffect.useResizeEffect)(function (text) {
    start();
  }, containerRef);
  (0, _useMutationEffect.useMutationEffect)(function () {
    start();
  }, textRef, {
    subtree: true,
    childList: true,
    characterData: true
  });
  if (!visible) return null;
  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(classPrefix, classPrefix + "-" + props.color)
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: classPrefix + "-left"
  }, 'icon' in props ? props.icon : /*#__PURE__*/_react["default"].createElement(_antdMobileIcons.SoundOutline, null)), /*#__PURE__*/_react["default"].createElement("span", {
    ref: containerRef,
    className: classPrefix + "-content"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    onTransitionEnd: function onTransitionEnd() {
      animatingRef.current = false;
      start();
    },
    ref: textRef,
    className: classPrefix + "-content-inner"
  }, props.content)), (props.closeable || props.extra) && /*#__PURE__*/_react["default"].createElement("span", {
    className: classPrefix + "-right"
  }, props.extra, props.closeable && /*#__PURE__*/_react["default"].createElement(_antdMobileIcons.CloseOutline, {
    onClick: function onClick() {
      var _a;

      setVisible(false);
      (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
    }
  }))));
});
exports.NoticeBar = NoticeBar;