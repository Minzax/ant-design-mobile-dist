"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabs = exports.Tab = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _web = require("@react-spring/web");

var _nativeProps = require("../../utils/native-props");

var _usePropsValue = require("../../utils/use-props-value");

var _bound = require("../../utils/bound");

var _ahooks = require("ahooks");

var _useMutationEffect = require("../../utils/use-mutation-effect");

var _useResizeEffect = require("../../utils/use-resize-effect");

var _withDefaultProps = require("../../utils/with-default-props");

var _useIsomorphicUpdateLayoutEffect = require("../../utils/use-isomorphic-update-layout-effect");

var _shouldRender = require("../../utils/should-render");

var _traverseReactNode = require("../../utils/traverse-react-node");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const classPrefix = `adm-tabs`;

const Tab = () => {
  return null;
};

exports.Tab = Tab;
const defaultProps = {
  activeLineMode: 'auto',
  stretch: true
};

const Tabs = p => {
  var _a;

  const props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  const tabListContainerRef = (0, _react.useRef)(null);
  const activeLineRef = (0, _react.useRef)(null);
  const keyToIndexRecord = {};
  let firstActiveKey = null;
  const panes = [];
  (0, _traverseReactNode.traverseReactNode)(props.children, (child, index) => {
    if (!_react.default.isValidElement(child)) return;
    const key = child.key;
    if (typeof key !== 'string') return;

    if (index === 0) {
      firstActiveKey = key;
    }

    const length = panes.push(child);
    keyToIndexRecord[key] = length - 1;
  });
  const [activeKey, setActiveKey] = (0, _usePropsValue.usePropsValue)({
    value: props.activeKey,
    defaultValue: (_a = props.defaultActiveKey) !== null && _a !== void 0 ? _a : firstActiveKey,
    onChange: v => {
      var _a;

      if (v === null) return;
      (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, v);
    }
  });
  const [{
    x,
    width
  }, api] = (0, _web.useSpring)(() => ({
    x: 0,
    width: 0,
    config: {
      tension: 300,
      clamp: true
    }
  }));
  const [{
    scrollLeft
  }, scrollApi] = (0, _web.useSpring)(() => ({
    scrollLeft: 0,
    config: {
      tension: 300,
      clamp: true
    }
  }));
  const [{
    leftMaskOpacity,
    rightMaskOpacity
  }, maskApi] = (0, _web.useSpring)(() => ({
    leftMaskOpacity: 0,
    rightMaskOpacity: 0,
    config: {
      clamp: true
    }
  }));

  function animate(immediate = false) {
    const container = tabListContainerRef.current;
    if (!container) return;
    const activeIndex = keyToIndexRecord[activeKey];

    if (activeIndex === undefined) {
      api.start({
        x: 0,
        width: 0,
        immediate: true
      });
      return;
    }

    const activeLine = activeLineRef.current;
    if (!activeLine) return;
    const activeTabWrapper = container.children.item(activeIndex + 1);
    const activeTab = activeTabWrapper.children.item(0);
    const activeTabLeft = activeTab.offsetLeft;
    const activeTabWidth = activeTab.offsetWidth;
    const activeTabWrapperLeft = activeTabWrapper.offsetLeft;
    const activeTabWrapperWidth = activeTabWrapper.offsetWidth;
    const containerWidth = container.offsetWidth;
    const containerScrollWidth = container.scrollWidth;
    const containerScrollLeft = container.scrollLeft;
    const activeLineWidth = activeLine.offsetWidth;
    let x = 0;
    let width = 0;

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
      x,
      width,
      immediate
    });
    const maxScrollDistance = containerScrollWidth - containerWidth;
    if (maxScrollDistance <= 0) return;
    const nextScrollLeft = (0, _bound.bound)(activeTabLeft - (containerWidth - activeTabWidth) / 2, 0, containerScrollWidth - containerWidth);
    scrollApi.start({
      scrollLeft: nextScrollLeft,
      from: {
        scrollLeft: containerScrollLeft
      },
      immediate
    });
  }

  (0, _ahooks.useIsomorphicLayoutEffect)(() => {
    animate(!x.isAnimating);
  }, []);
  (0, _useIsomorphicUpdateLayoutEffect.useIsomorphicUpdateLayoutEffect)(() => {
    animate();
  }, [activeKey]);
  (0, _useResizeEffect.useResizeEffect)(() => {
    animate(!x.isAnimating);
  }, tabListContainerRef);
  (0, _useMutationEffect.useMutationEffect)(() => {
    animate(!x.isAnimating);
  }, tabListContainerRef, {
    subtree: true,
    childList: true,
    characterData: true
  });
  const {
    run: updateMask
  } = (0, _ahooks.useThrottleFn)((immediate = false) => {
    const container = tabListContainerRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const showLeftMask = scrollLeft > 0;
    const showRightMask = scrollLeft + container.offsetWidth < container.scrollWidth;
    maskApi.start({
      leftMaskOpacity: showLeftMask ? 1 : 0,
      rightMaskOpacity: showRightMask ? 1 : 0,
      immediate
    });
  }, {
    wait: 100,
    trailing: true,
    leading: true
  });
  (0, _ahooks.useIsomorphicLayoutEffect)(() => {
    updateMask(true);
  }, []);
  return (0, _nativeProps.withNativeProps)(props, _react.default.createElement("div", {
    className: classPrefix
  }, _react.default.createElement("div", {
    className: `${classPrefix}-header`
  }, _react.default.createElement(_web.animated.div, {
    className: (0, _classnames.default)(`${classPrefix}-header-mask`, `${classPrefix}-header-mask-left`),
    style: {
      opacity: leftMaskOpacity
    }
  }), _react.default.createElement(_web.animated.div, {
    className: (0, _classnames.default)(`${classPrefix}-header-mask`, `${classPrefix}-header-mask-right`),
    style: {
      opacity: rightMaskOpacity
    }
  }), _react.default.createElement(_web.animated.div, {
    className: `${classPrefix}-tab-list`,
    ref: tabListContainerRef,
    scrollLeft: scrollLeft,
    onScroll: updateMask
  }, _react.default.createElement(_web.animated.div, {
    ref: activeLineRef,
    className: `${classPrefix}-tab-line`,
    style: {
      width: props.activeLineMode === 'fixed' ? 'var(--fixed-active-line-width, 30px)' : width,
      x
    }
  }), panes.map(pane => (0, _nativeProps.withNativeProps)(pane.props, _react.default.createElement("div", {
    key: pane.key,
    className: (0, _classnames.default)(`${classPrefix}-tab-wrapper`, {
      [`${classPrefix}-tab-wrapper-stretch`]: props.stretch
    })
  }, _react.default.createElement("div", {
    onClick: () => {
      const {
        key
      } = pane;
      if (pane.props.disabled) return;

      if (key === undefined || key === null) {
        return;
      }

      setActiveKey(key.toString());
    },
    className: (0, _classnames.default)(`${classPrefix}-tab`, {
      [`${classPrefix}-tab-active`]: pane.key === activeKey,
      [`${classPrefix}-tab-disabled`]: pane.props.disabled
    })
  }, pane.props.title)))))), panes.map(pane => {
    if (pane.props.children === undefined) {
      return null;
    }

    const active = pane.key === activeKey;
    return _react.default.createElement(_shouldRender.ShouldRender, {
      key: pane.key,
      active: active,
      forceRender: pane.props.forceRender,
      destroyOnClose: pane.props.destroyOnClose
    }, _react.default.createElement("div", {
      className: `${classPrefix}-content`,
      style: {
        display: active ? 'block' : 'none'
      }
    }, pane.props.children));
  })));
};

exports.Tabs = Tabs;