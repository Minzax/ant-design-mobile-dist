"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wheel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _web = require("@react-spring/web");

var _react2 = require("@use-gesture/react");

var _rubberband = require("../../utils/rubberband");

var _bound = require("../../utils/bound");

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _ahooks = require("ahooks");

var _measureCssLength = require("../../utils/measure-css-length");

var _supportsPassive = require("../../utils/supports-passive");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const classPrefix = `adm-picker-view`;
const Wheel = (0, _react.memo)(props => {
  const {
    value,
    column,
    renderLabel
  } = props;

  function onSelect(val) {
    props.onSelect(val, props.index);
  }

  const [{
    y
  }, api] = (0, _web.useSpring)(() => ({
    from: {
      y: 0
    },
    config: {
      tension: 400,
      mass: 0.8
    }
  }));
  const draggingRef = (0, _react.useRef)(false);
  const rootRef = (0, _react.useRef)(null);
  const itemHeight = (0, _react.useRef)(34);
  (0, _ahooks.useIsomorphicLayoutEffect)(() => {
    const root = rootRef.current;
    if (!root) return;
    itemHeight.current = (0, _measureCssLength.measureCSSLength)(window.getComputedStyle(root).getPropertyValue('--item-height'));
  });
  (0, _ahooks.useIsomorphicLayoutEffect)(() => {
    if (draggingRef.current) return;
    if (!value) return;
    const targetIndex = column.findIndex(item => item.value === value);
    if (targetIndex < 0) return;
    const finalPosition = targetIndex * -itemHeight.current;
    api.start({
      y: finalPosition,
      immediate: y.goal !== finalPosition
    });
  }, [value, column]);
  (0, _ahooks.useIsomorphicLayoutEffect)(() => {
    if (column.length === 0) {
      if (value !== null) {
        onSelect(null);
      }
    } else {
      if (!column.some(item => item.value === value)) {
        const firstItem = column[0];
        onSelect(firstItem.value);
      }
    }
  }, [column, value]);

  function scrollSelect(index) {
    const finalPosition = index * -itemHeight.current;
    api.start({
      y: finalPosition
    });
    const item = column[index];
    if (!item) return;
    onSelect(item.value);
  }

  const handleDrag = state => {
    draggingRef.current = true;
    const min = -((column.length - 1) * itemHeight.current);
    const max = 0;

    if (state.last) {
      draggingRef.current = false;
      const position = state.offset[1] + state.velocity[1] * state.direction[1] * 50;
      const targetIndex = min < max ? -Math.round((0, _bound.bound)(position, min, max) / itemHeight.current) : 0;
      scrollSelect(targetIndex);
    } else {
      const position = state.offset[1];
      api.start({
        y: (0, _rubberband.rubberbandIfOutOfBounds)(position, min, max, itemHeight.current * 50, 0.2)
      });
    }
  };

  (0, _react2.useDrag)(state => {
    state.event.stopPropagation();
    handleDrag(state);
  }, {
    axis: 'y',
    from: () => [0, y.get()],
    filterTaps: true,
    pointer: {
      touch: true
    },
    target: rootRef
  });
  (0, _react2.useWheel)(state => {
    state.event.stopPropagation();
    handleDrag(state);
  }, {
    axis: 'y',
    from: () => [0, y.get()],
    preventDefault: true,
    target: props.mouseWheel ? rootRef : undefined,
    eventOptions: _supportsPassive.supportsPassive ? {
      passive: false
    } : false
  });
  let selectedIndex = null;

  function renderAccessible() {
    if (selectedIndex === null) {
      return null;
    }

    const current = column[selectedIndex];
    const previousIndex = selectedIndex - 1;
    const nextIndex = selectedIndex + 1;
    const previous = column[previousIndex];
    const next = column[nextIndex];
    return _react.default.createElement("div", {
      className: 'adm-picker-view-column-accessible'
    }, _react.default.createElement("div", {
      className: 'adm-picker-view-column-accessible-current',
      role: 'button',
      "aria-label": current ? `?????????????????????${current.label}` : '???????????????'
    }, "-"), _react.default.createElement("div", null, previous && _react.default.createElement("div", {
      className: 'adm-picker-view-column-accessible-button',
      onClick: () => {
        scrollSelect(previousIndex);
      },
      role: 'button',
      "aria-label": `??????????????????${previous.label}`
    }, "-")), _react.default.createElement("div", null, next && _react.default.createElement("div", {
      className: 'adm-picker-view-column-accessible-button',
      onClick: () => {
        scrollSelect(nextIndex);
      },
      role: 'button',
      "aria-label": `??????????????????${next.label}`
    }, "-")));
  }

  return _react.default.createElement("div", {
    ref: rootRef,
    className: `${classPrefix}-column`
  }, _react.default.createElement(_web.animated.div, {
    style: {
      translateY: y
    },
    className: `${classPrefix}-column-wheel`,
    "aria-hidden": true
  }, column.map((item, index) => {
    var _a;

    const selected = props.value === item.value;
    if (selected) selectedIndex = index;

    function handleClick() {
      draggingRef.current = false;
      scrollSelect(index);
    }

    return _react.default.createElement("div", {
      key: (_a = item.key) !== null && _a !== void 0 ? _a : item.value,
      "data-selected": item.value === value,
      className: `${classPrefix}-column-item`,
      onClick: handleClick,
      "aria-hidden": !selected,
      "aria-label": selected ? 'active' : ''
    }, _react.default.createElement("div", {
      className: `${classPrefix}-column-item-label`
    }, renderLabel(item)));
  })), renderAccessible());
}, (prev, next) => {
  if (prev.index !== next.index) return false;
  if (prev.value !== next.value) return false;
  if (prev.onSelect !== next.onSelect) return false;

  if (!(0, _isEqual.default)(prev.column, next.column)) {
    return false;
  }

  return true;
});
exports.Wheel = Wheel;
Wheel.displayName = 'Wheel';