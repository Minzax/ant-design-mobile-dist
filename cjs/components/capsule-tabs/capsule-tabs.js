"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CapsuleTabs = exports.CapsuleTab = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _web = require("@react-spring/web");

var _nativeProps = require("../../utils/native-props");

var _usePropsValue2 = require("../../utils/use-props-value");

var _useResizeEffect = require("../../utils/use-resize-effect");

var _useTabListScroll2 = require("../../utils/use-tab-list-scroll");

var _scrollMask = _interopRequireDefault(require("../scroll-mask"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var classPrefix = "adm-capsule-tabs";

var CapsuleTab = function CapsuleTab() {
  return null;
};

exports.CapsuleTab = CapsuleTab;

var CapsuleTabs = function CapsuleTabs(props) {
  var _a;

  var tabListContainerRef = (0, _react.useRef)(null);
  var rootRef = (0, _react.useRef)(null);
  var keyToIndexRecord = {};
  var firstActiveKey = null;
  var panes = [];

  _react["default"].Children.forEach(props.children, function (child, index) {
    if (! /*#__PURE__*/_react["default"].isValidElement(child)) return;
    var key = child.key;
    if (typeof key !== 'string') return;

    if (index === 0) {
      firstActiveKey = key;
    }

    var length = panes.push(child);
    keyToIndexRecord[key] = length - 1;
  });

  var _usePropsValue = (0, _usePropsValue2.usePropsValue)({
    value: props.activeKey,
    defaultValue: (_a = props.defaultActiveKey) !== null && _a !== void 0 ? _a : firstActiveKey,
    onChange: props.onChange
  }),
      activeKey = _usePropsValue[0],
      setActiveKey = _usePropsValue[1];

  var _useTabListScroll = (0, _useTabListScroll2.useTabListScroll)(tabListContainerRef, keyToIndexRecord[activeKey]),
      scrollLeft = _useTabListScroll.scrollLeft,
      animate = _useTabListScroll.animate;

  (0, _useResizeEffect.useResizeEffect)(function () {
    animate(true);
  }, rootRef);
  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix,
    ref: rootRef
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-header"
  }, /*#__PURE__*/_react["default"].createElement(_scrollMask["default"], {
    scrollTrackRef: tabListContainerRef
  }), /*#__PURE__*/_react["default"].createElement(_web.animated.div, {
    className: classPrefix + "-tab-list",
    ref: tabListContainerRef,
    scrollLeft: scrollLeft
  }, panes.map(function (pane) {
    var _classNames;

    return (0, _nativeProps.withNativeProps)(pane.props, /*#__PURE__*/_react["default"].createElement("div", {
      key: pane.key,
      className: classPrefix + "-tab-wrapper"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      onClick: function onClick() {
        var key = pane.key;
        if (pane.props.disabled) return;

        if (key === undefined || key === null) {
          return;
        }

        setActiveKey(key.toString());
      },
      className: (0, _classnames["default"])(classPrefix + "-tab", (_classNames = {}, _classNames[classPrefix + "-tab-active"] = pane.key === activeKey, _classNames[classPrefix + "-tab-disabled"] = pane.props.disabled, _classNames))
    }, pane.props.title)));
  }))), panes.map(function (pane) {
    if (pane.props.children === undefined) {
      return null;
    }

    if (pane.key === activeKey) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: pane.key,
        className: classPrefix + "-content"
      }, pane.props.children);
    }

    if (pane.props.forceRender) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: pane.key,
        style: {
          display: 'none'
        }
      }, pane.props.children);
    }

    return null;
  })));
};

exports.CapsuleTabs = CapsuleTabs;