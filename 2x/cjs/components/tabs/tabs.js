"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabs = exports.Tab = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _web = require("@react-spring/web");

var _nativeProps = require("../../utils/native-props");

var _usePropsValue2 = require("../../utils/use-props-value");

var _bound = require("../../utils/bound");

var _ahooks = require("ahooks");

var _useMutationEffect = require("../../utils/use-mutation-effect");

var _useResizeEffect = require("../../utils/use-resize-effect");

var _withDefaultProps = require("../../utils/with-default-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var classPrefix = "adm-tabs";

var Tab = function Tab() {
  return null;
};

exports.Tab = Tab;
var defaultProps = {
  activeLineMode: 'auto',
  stretch: true
};

var Tabs = function Tabs(p) {
  var _a;

  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  var tabListContainerRef = (0, _react.useRef)(null);
  var activeLineRef = (0, _react.useRef)(null);
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

  var _useSpring = (0, _web.useSpring)(function () {
    return {
      x: 0,
      width: 0,
      config: {
        tension: 300,
        clamp: true
      }
    };
  }),
      _useSpring$ = _useSpring[0],
      x = _useSpring$.x,
      width = _useSpring$.width,
      api = _useSpring[1];

  var _useSpring2 = (0, _web.useSpring)(function () {
    return {
      scrollLeft: 0,
      config: {
        tension: 300,
        clamp: true
      }
    };
  }),
      scrollLeft = _useSpring2[0].scrollLeft,
      scrollApi = _useSpring2[1];

  var _useSpring3 = (0, _web.useSpring)(function () {
    return {
      leftMaskOpacity: 0,
      rightMaskOpacity: 0,
      config: {
        clamp: true
      }
    };
  }),
      _useSpring3$ = _useSpring3[0],
      leftMaskOpacity = _useSpring3$.leftMaskOpacity,
      rightMaskOpacity = _useSpring3$.rightMaskOpacity,
      maskApi = _useSpring3[1];

  function animate(immediate) {
    if (immediate === void 0) {
      immediate = false;
    }

    var container = tabListContainerRef.current;
    if (!container) return;
    var activeIndex = keyToIndexRecord[activeKey];

    if (activeIndex === undefined) {
      api.start({
        x: 0,
        width: 0,
        immediate: true
      });
      return;
    }

    var activeLine = activeLineRef.current;
    if (!activeLine) return;
    var activeTabWrapper = container.children.item(activeIndex + 1);
    var activeTab = activeTabWrapper.children.item(0);
    var activeTabLeft = activeTab.offsetLeft;
    var activeTabWidth = activeTab.offsetWidth;
    var activeTabWrapperLeft = activeTabWrapper.offsetLeft;
    var activeTabWrapperWidth = activeTabWrapper.offsetWidth;
    var containerWidth = container.offsetWidth;
    var containerScrollWidth = container.scrollWidth;
    var containerScrollLeft = container.scrollLeft;
    var activeLineWidth = activeLine.offsetWidth;
    var x = 0;
    var width = 0;

    if (props.activeLineMode === 'auto') {
      x = activeTabLeft;
      width = activeTabWidth;
    } else if (props.activeLineMode === 'full') {
      x = activeTabWrapperLeft;
      width = activeTabWrapperWidth;
    } else {
      x = activeTabLeft + (activeTabWidth - activeLineWidth) / 2;
    }

    api.start({
      x: x,
      width: width,
      immediate: immediate
    });
    var maxScrollDistance = containerScrollWidth - containerWidth;
    if (maxScrollDistance <= 0) return;
    var nextScrollLeft = (0, _bound.bound)(activeTabLeft - (containerWidth - activeTabWidth) / 2, 0, containerScrollWidth - containerWidth);
    scrollApi.start({
      scrollLeft: nextScrollLeft,
      from: {
        scrollLeft: containerScrollLeft
      },
      immediate: immediate
    });
  }

  (0, _react.useLayoutEffect)(function () {
    animate(true);
  }, []);
  (0, _ahooks.useUpdateLayoutEffect)(function () {
    animate();
  }, [activeKey]);
  (0, _useResizeEffect.useResizeEffect)(function () {
    animate(true);
  }, tabListContainerRef);
  (0, _useMutationEffect.useMutationEffect)(function () {
    animate(true);
  }, tabListContainerRef, {
    subtree: true,
    childList: true,
    characterData: true
  });

  var _useThrottleFn = (0, _ahooks.useThrottleFn)(function (immediate) {
    if (immediate === void 0) {
      immediate = false;
    }

    var container = tabListContainerRef.current;
    if (!container) return;
    var scrollLeft = container.scrollLeft;
    var showLeftMask = scrollLeft > 0;
    var showRightMask = scrollLeft + container.offsetWidth < container.scrollWidth;
    maskApi.start({
      leftMaskOpacity: showLeftMask ? 1 : 0,
      rightMaskOpacity: showRightMask ? 1 : 0,
      immediate: immediate
    });
  }, {
    wait: 100,
    trailing: true,
    leading: true
  }),
      updateMask = _useThrottleFn.run;

  (0, _react.useLayoutEffect)(function () {
    updateMask(true);
  }, []);
  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-header"
  }, /*#__PURE__*/_react["default"].createElement(_web.animated.div, {
    className: (0, _classnames["default"])(classPrefix + "-header-mask", classPrefix + "-header-mask-left"),
    style: {
      opacity: leftMaskOpacity
    }
  }), /*#__PURE__*/_react["default"].createElement(_web.animated.div, {
    className: (0, _classnames["default"])(classPrefix + "-header-mask", classPrefix + "-header-mask-right"),
    style: {
      opacity: rightMaskOpacity
    }
  }), /*#__PURE__*/_react["default"].createElement(_web.animated.div, {
    className: classPrefix + "-tab-list",
    ref: tabListContainerRef,
    scrollLeft: scrollLeft,
    onScroll: updateMask
  }, /*#__PURE__*/_react["default"].createElement(_web.animated.div, {
    ref: activeLineRef,
    className: classPrefix + "-tab-line",
    style: {
      width: props.activeLineMode === 'fixed' ? 'var(--fixed-active-line-width, 30px)' : width,
      x: x
    }
  }), panes.map(function (pane) {
    var _classNames, _classNames2;

    return (0, _nativeProps.withNativeProps)(pane.props, /*#__PURE__*/_react["default"].createElement("div", {
      key: pane.key,
      className: (0, _classnames["default"])(classPrefix + "-tab-wrapper", (_classNames = {}, _classNames[classPrefix + "-tab-wrapper-stretch"] = props.stretch, _classNames))
    }, /*#__PURE__*/_react["default"].createElement("div", {
      onClick: function onClick() {
        var key = pane.key;
        if (pane.props.disabled) return;

        if (key === undefined || key === null) {
          return;
        }

        setActiveKey(key.toString());
      },
      className: (0, _classnames["default"])(classPrefix + "-tab", (_classNames2 = {}, _classNames2[classPrefix + "-tab-active"] = pane.key === activeKey, _classNames2[classPrefix + "-tab-disabled"] = pane.props.disabled, _classNames2))
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

exports.Tabs = Tabs;