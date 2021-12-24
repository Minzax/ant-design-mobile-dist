"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwipeAction = void 0;

var _react = _interopRequireWildcard(require("react"));

var _withDefaultProps = require("../../utils/with-default-props");

var _web = require("@react-spring/web");

var _react2 = require("@use-gesture/react");

var _button = _interopRequireDefault(require("../button"));

var _nearest = require("../../utils/nearest");

var _nativeProps = require("../../utils/native-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var defaultProps = {
  rightActions: [],
  leftActions: [],
  closeOnTouchOutside: true,
  closeOnAction: true
};
var SwipeAction = /*#__PURE__*/(0, _react.forwardRef)(function (p, ref) {
  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  var rootRef = (0, _react.useRef)(null);
  var leftRef = (0, _react.useRef)(null);
  var rightRef = (0, _react.useRef)(null);

  function getWidth(ref) {
    var element = ref.current;
    if (!element) return 0;
    return element.offsetWidth;
  }

  function getLeftWidth() {
    return getWidth(leftRef);
  }

  function getRightWidth() {
    return getWidth(rightRef);
  }

  var _useSpring = (0, _web.useSpring)(function () {
    return {
      x: 0,
      config: {
        tension: 200,
        friction: 30
      }
    };
  }, []),
      x = _useSpring[0].x,
      api = _useSpring[1];

  var draggingRef = (0, _react.useRef)(false);
  var bind = (0, _react2.useDrag)(function (state) {
    draggingRef.current = true;
    var _state$offset = state.offset,
        offsetX = _state$offset[0];

    if (state.last) {
      var leftWidth = getLeftWidth();
      var rightWidth = getRightWidth();
      var position = offsetX + state.velocity[0] * state.direction[0] * 50;

      if (offsetX > 0) {
        position = Math.max(0, position);
      } else if (offsetX < 0) {
        position = Math.min(0, position);
      } else {
        position = 0;
      }

      api.start({
        x: (0, _nearest.nearest)([-rightWidth, 0, leftWidth], position)
      });
      window.setTimeout(function () {
        draggingRef.current = false;
      });
    } else {
      api.start({
        x: offsetX,
        immediate: true
      });
    }
  }, {
    from: function from() {
      return [x.get(), 0];
    },
    bounds: function bounds() {
      var leftWidth = getLeftWidth();
      var rightWidth = getRightWidth();
      return {
        left: -rightWidth,
        right: leftWidth
      };
    },
    // rubberband: true,
    axis: 'x',
    preventScroll: true,
    pointer: {
      touch: true
    }
  });

  function close() {
    api.start({
      x: 0
    });
  }

  (0, _react.useImperativeHandle)(ref, function () {
    return {
      show: function show(side) {
        if (side === void 0) {
          side = 'right';
        }

        if (side === 'right') {
          api.start({
            x: -getRightWidth()
          });
        } else if (side === 'left') {
          api.start({
            x: getLeftWidth()
          });
        }
      },
      close: close
    };
  });
  (0, _react.useEffect)(function () {
    if (!props.closeOnTouchOutside) return;

    function handle(e) {
      if (x.get() === 0) {
        return;
      }

      var root = rootRef.current;

      if (root && !root.contains(e.target)) {
        close();
      }
    }

    document.addEventListener('touchstart', handle);
    return function () {
      document.removeEventListener('touchstart', handle);
    };
  }, [props.closeOnTouchOutside]);

  function renderAction(action) {
    var _a, _b;

    var color = (_a = action.color) !== null && _a !== void 0 ? _a : 'light';
    return /*#__PURE__*/_react["default"].createElement(_button["default"], {
      key: action.key,
      className: 'adm-swipe-action-action-button',
      style: {
        '--background-color': (_b = colorRecord[color]) !== null && _b !== void 0 ? _b : color
      },
      onClick: function onClick(e) {
        var _a, _b;

        if (props.closeOnAction) {
          close();
        }

        (_a = action.onClick) === null || _a === void 0 ? void 0 : _a.call(action, e);
        (_b = props.onAction) === null || _b === void 0 ? void 0 : _b.call(props, action);
      }
    }, action.text);
  }

  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", Object.assign({
    className: 'adm-swipe-action'
  }, bind(), {
    ref: rootRef,
    onClickCapture: function onClickCapture(e) {
      if (draggingRef.current) {
        e.stopPropagation();
        e.preventDefault();
      }
    }
  }), /*#__PURE__*/_react["default"].createElement(_web.animated.div, {
    className: 'adm-swipe-action-track',
    style: {
      x: x
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: 'adm-swipe-action-actions adm-swipe-action-actions-left',
    ref: leftRef
  }, props.leftActions.map(renderAction)), /*#__PURE__*/_react["default"].createElement("div", {
    className: 'adm-swipe-action-content',
    onClickCapture: function onClickCapture(e) {
      if (x.goal !== 0) {
        e.preventDefault();
        e.stopPropagation();
        api.start({
          x: 0
        });
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_web.animated.div, {
    style: {
      pointerEvents: x.to(function (v) {
        return v !== 0 && x.goal !== 0 ? 'none' : 'unset';
      })
    }
  }, props.children)), /*#__PURE__*/_react["default"].createElement("div", {
    className: 'adm-swipe-action-actions adm-swipe-action-actions-right',
    ref: rightRef
  }, props.rightActions.map(renderAction)))));
});
exports.SwipeAction = SwipeAction;
var colorRecord = {
  light: 'var(--adm-color-light)',
  weak: 'var(--adm-color-weak)',
  primary: 'var(--adm-color-primary)',
  success: 'var(--adm-color-success)',
  warning: 'var(--adm-color-warning)',
  danger: 'var(--adm-color-danger)'
};