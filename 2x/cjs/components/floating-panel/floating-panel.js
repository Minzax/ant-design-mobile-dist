"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloatingPanel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _nativeProps = require("../../utils/native-props");

var _react2 = require("@use-gesture/react");

var _web = require("@react-spring/web");

var _supportsPassive = require("../../utils/supports-passive");

var _nearest = require("../../utils/nearest");

var _withDefaultProps = require("../../utils/with-default-props");

var _useLockScroll = require("../../utils/use-lock-scroll");

var _ahooks = require("ahooks");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const defaultProps = {
  handleDraggingOfContent: true
};
const FloatingPanel = (0, _react.forwardRef)((p, ref) => {
  var _a, _b;

  const props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  const {
    anchors,
    headerChildren,
    onIndexDragEndChange
  } = props;
  const maxHeight = (_a = anchors[anchors.length - 1]) !== null && _a !== void 0 ? _a : window.innerHeight;
  const possibles = anchors.map(x => -x);
  const elementRef = (0, _react.useRef)(null);
  const headerRef = (0, _react.useRef)(null);
  const contentRef = (0, _react.useRef)(null);
  const [pulling, setPulling] = (0, _react.useState)(false);
  const pullingRef = (0, _react.useRef)(false);
  const bounds = {
    top: possibles[possibles.length - 1],
    bottom: possibles[0]
  };
  const onHeightChange = (0, _ahooks.useMemoizedFn)((_b = props.onHeightChange) !== null && _b !== void 0 ? _b : () => {});
  const [{
    y
  }, api] = (0, _web.useSpring)(() => ({
    y: bounds.bottom,
    config: {
      tension: 300
    },
    onChange: result => {
      onHeightChange(result.value.y, y.isAnimating);
    }
  }));
  (0, _react2.useDrag)(state => {
    const [, offsetY] = state.offset;

    if (state.first) {
      const target = state.event.target;
      const header = headerRef.current;

      if (header === target || (header === null || header === void 0 ? void 0 : header.contains(target))) {
        pullingRef.current = true;
      } else {
        if (!props.handleDraggingOfContent) return;
        const reachedTop = y.goal <= bounds.top;
        const content = contentRef.current;
        if (!content) return;

        if (reachedTop) {
          if (content.scrollTop <= 0 && state.direction[1] > 0) {
            pullingRef.current = true;
          }
        } else {
          pullingRef.current = true;
        }
      }
    }

    setPulling(pullingRef.current);
    if (!pullingRef.current) return;
    const {
      event
    } = state;

    if (event.cancelable) {
      event.preventDefault();
    }

    event.stopPropagation();
    let nextY = offsetY;

    if (state.last) {
      pullingRef.current = false;
      setPulling(false);
      nextY = (0, _nearest.nearest)(possibles, offsetY);
      onIndexDragEndChange === null || onIndexDragEndChange === void 0 ? void 0 : onIndexDragEndChange(possibles.indexOf(nextY));
    }

    api.start({
      y: nextY
    });
  }, {
    axis: 'y',
    bounds,
    rubberband: true,
    from: () => [0, y.get()],
    pointer: {
      touch: true
    },
    target: elementRef,
    eventOptions: _supportsPassive.supportsPassive ? {
      passive: false
    } : false
  });
  (0, _react.useImperativeHandle)(ref, () => ({
    setHeight: (height, options) => {
      api.start({
        y: -height,
        immediate: options === null || options === void 0 ? void 0 : options.immediate
      });
    }
  }), [api]);
  (0, _useLockScroll.useLockScroll)(elementRef, true);
  return (0, _nativeProps.withNativeProps)(props, _react.default.createElement(_web.animated.div, {
    ref: elementRef,
    className: 'adm-floating-panel',
    style: {
      height: maxHeight,
      translateY: y.to(y => `calc(100% + (${y}px))`)
    }
  }, _react.default.createElement("div", {
    className: 'adm-floating-panel-mask',
    style: {
      display: pulling ? 'block' : 'none'
    }
  }), _react.default.createElement("div", {
    className: 'adm-floating-panel-header',
    ref: headerRef
  }, headerChildren || _react.default.createElement("div", {
    className: 'adm-floating-panel-bar'
  })), _react.default.createElement("div", {
    className: 'adm-floating-panel-content',
    ref: contentRef
  }, props.children)));
});
exports.FloatingPanel = FloatingPanel;