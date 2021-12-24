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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var FloatingPanel = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  var _a;

  var anchors = props.anchors;
  var maxHeight = (_a = anchors[anchors.length - 1]) !== null && _a !== void 0 ? _a : window.innerHeight;
  var possibles = anchors.map(function (x) {
    return -x;
  });
  var elementRef = (0, _react.useRef)(null);
  var headerRef = (0, _react.useRef)(null);
  var contentRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(false),
      pulling = _useState[0],
      setPulling = _useState[1];

  var pullingRef = (0, _react.useRef)(false);
  var bounds = {
    top: possibles[possibles.length - 1],
    bottom: possibles[0]
  };

  var _useSpring = (0, _web.useSpring)(function () {
    return {
      y: bounds.bottom,
      config: {
        tension: 300
      }
    };
  }),
      y = _useSpring[0].y,
      api = _useSpring[1];

  (0, _react2.useDrag)(function (state) {
    var _state$offset = state.offset,
        offsetY = _state$offset[1];

    if (state.first) {
      var target = state.event.target;
      var header = headerRef.current;

      if (header === target || (header === null || header === void 0 ? void 0 : header.contains(target))) {
        pullingRef.current = true;
      } else {
        var reachedTop = y.goal <= bounds.top;
        var content = contentRef.current;
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
    var event = state.event;

    if (event.cancelable) {
      event.preventDefault();
    }

    event.stopPropagation();
    var nextY = offsetY;

    if (state.last) {
      pullingRef.current = false;
      setPulling(false);
      nextY = (0, _nearest.nearest)(possibles, offsetY);
    }

    api.start({
      y: nextY
    });
  }, {
    axis: 'y',
    bounds: bounds,
    rubberband: true,
    from: function from() {
      return [0, y.get()];
    },
    pointer: {
      touch: true
    },
    target: elementRef,
    eventOptions: _supportsPassive.supportsPassive ? {
      passive: false
    } : false
  });
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      setHeight: function setHeight(height, options) {
        api.start({
          y: -height,
          immediate: options === null || options === void 0 ? void 0 : options.immediate
        });
      }
    };
  }, [api]);
  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement(_web.animated.div, {
    ref: elementRef,
    className: 'adm-floating-panel',
    style: {
      height: maxHeight,
      y: y
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: 'adm-floating-panel-mask',
    style: {
      display: pulling ? 'block' : 'none'
    }
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: 'adm-floating-panel-header',
    ref: headerRef
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: 'adm-floating-panel-bar'
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: 'adm-floating-panel-content',
    ref: contentRef
  }, props.children)));
});
exports.FloatingPanel = FloatingPanel;