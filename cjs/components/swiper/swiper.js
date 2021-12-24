"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Swiper = void 0;

var _react = _interopRequireWildcard(require("react"));

var _nativeProps = require("../../utils/native-props");

var _withDefaultProps = require("../../utils/with-default-props");

var _classnames = _interopRequireDefault(require("classnames"));

var _swiperItem = require("./swiper-item");

var _devLog = require("../../utils/dev-log");

var _web = require("@react-spring/web");

var _react2 = require("@use-gesture/react");

var _pageIndicator = _interopRequireDefault(require("../page-indicator"));

var _stagedComponents = require("staged-components");

var _useRefState2 = require("../../utils/use-ref-state");

var _bound = require("../../utils/bound");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var defaultProps = {
  defaultIndex: 0,
  allowTouchMove: true,
  autoplay: false,
  autoplayInterval: 3000,
  loop: false,
  direction: 'horizontal',
  slideSize: 100,
  trackOffset: 0,
  stuckAtBoundary: true,
  rubberband: true
};
var Swiper = /*#__PURE__*/(0, _react.forwardRef)((0, _stagedComponents.staged)(function (p, ref) {
  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  var isVertical = props.direction === 'vertical';
  var slideRatio = props.slideSize / 100;
  var offsetRatio = props.trackOffset / 100;

  var _useMemo = (0, _react.useMemo)(function () {
    var count = 0;

    var validChildren = _react["default"].Children.map(props.children, function (child) {
      if (! /*#__PURE__*/_react["default"].isValidElement(child)) return null;

      if (child.type !== _swiperItem.SwiperItem) {
        (0, _devLog.devWarning)('Swiper', 'The children of `Swiper` must be `Swiper.Item` components.');
        return null;
      }

      count++;
      return child;
    });

    return {
      validChildren: validChildren,
      count: count
    };
  }, [props.children]),
      validChildren = _useMemo.validChildren,
      count = _useMemo.count;

  if (count === 0 || !validChildren) {
    (0, _devLog.devWarning)('Swiper', '`Swiper` needs at least one child.');
    return null;
  }

  return function () {
    var loop = props.loop;

    if (slideRatio * (count - 1) < 1) {
      loop = false;
    }

    var trackRef = (0, _react.useRef)(null);

    function getSlidePixels() {
      var track = trackRef.current;
      if (!track) return 0;
      var trackPixels = isVertical ? track.offsetHeight : track.offsetWidth;
      return trackPixels * props.slideSize / 100;
    }

    var _useState = (0, _react.useState)(props.defaultIndex),
        current = _useState[0],
        setCurrent = _useState[1];

    var _useRefState = (0, _useRefState2.useRefState)(false),
        dragging = _useRefState[0],
        setDragging = _useRefState[1],
        draggingRef = _useRefState[2];

    function boundIndex(current) {
      var min = 0;
      var max = count - 1;

      if (props.stuckAtBoundary) {
        min += offsetRatio / slideRatio;
        max -= (1 - slideRatio - offsetRatio) / slideRatio;
      }

      return (0, _bound.bound)(current, min, max);
    }

    var _useSpring = (0, _web.useSpring)(function () {
      return {
        position: boundIndex(current) * 100,
        config: {
          tension: 200,
          friction: 30
        },
        onRest: function onRest() {
          if (draggingRef.current) return;
          var rawX = position.get();
          var totalWidth = 100 * count;
          var standardPosition = modulus(rawX, totalWidth);
          if (standardPosition === rawX) return;
          api.start({
            position: standardPosition,
            immediate: true
          });
        }
      };
    }, [count]),
        position = _useSpring[0].position,
        api = _useSpring[1];

    var bind = (0, _react2.useDrag)(function (state) {
      var slidePixels = getSlidePixels();
      if (!slidePixels) return;
      var paramIndex = isVertical ? 1 : 0;
      var offset = state.offset[paramIndex];
      var direction = state.direction[paramIndex];
      var velocity = state.velocity[paramIndex];
      setDragging(true);

      if (!state.last) {
        api.start({
          position: offset * 100 / slidePixels,
          immediate: true
        });
      } else {
        var minIndex = Math.floor(offset / slidePixels);
        var maxIndex = minIndex + 1;
        var index = Math.round((offset + velocity * 2000 * direction) / slidePixels);
        swipeTo((0, _bound.bound)(index, minIndex, maxIndex));
        window.setTimeout(function () {
          setDragging(false);
        });
      }
    }, {
      transform: function transform(_ref) {
        var x = _ref[0],
            y = _ref[1];
        return [-x, -y];
      },
      from: function from() {
        var slidePixels = getSlidePixels();
        return [position.get() / 100 * slidePixels, position.get() / 100 * slidePixels];
      },
      bounds: function bounds() {
        if (loop) return {};
        var slidePixels = getSlidePixels();
        var lowerBound = boundIndex(0) * slidePixels;
        var upperBound = boundIndex(count - 1) * slidePixels;
        return isVertical ? {
          top: lowerBound,
          bottom: upperBound
        } : {
          left: lowerBound,
          right: upperBound
        };
      },
      rubberband: props.rubberband,
      axis: isVertical ? 'y' : 'x',
      preventScroll: !isVertical,
      pointer: {
        touch: true
      }
    });

    function swipeTo(index, immediate) {
      if (immediate === void 0) {
        immediate = false;
      }

      var _a, _b;

      if (loop) {
        var i = modulus(index, count);
        setCurrent(i);
        (_a = props.onIndexChange) === null || _a === void 0 ? void 0 : _a.call(props, i);
        api.start({
          position: index * 100,
          immediate: immediate
        });
      } else {
        var _i = (0, _bound.bound)(index, 0, count - 1);

        setCurrent(_i);
        (_b = props.onIndexChange) === null || _b === void 0 ? void 0 : _b.call(props, _i);
        api.start({
          position: boundIndex(_i) * 100,
          immediate: immediate
        });
      }
    }

    function swipeNext() {
      swipeTo(Math.round(position.get() / 100) + 1);
    }

    function swipePrev() {
      swipeTo(Math.round(position.get() / 100) - 1);
    }

    (0, _react.useImperativeHandle)(ref, function () {
      return {
        swipeTo: swipeTo,
        swipeNext: swipeNext,
        swipePrev: swipePrev
      };
    });
    (0, _react.useLayoutEffect)(function () {
      var maxIndex = validChildren.length - 1;

      if (current > maxIndex) {
        swipeTo(maxIndex, true);
      }
    });
    var autoplay = props.autoplay,
        autoplayInterval = props.autoplayInterval;
    (0, _react.useEffect)(function () {
      if (!autoplay || dragging) return;
      var interval = window.setInterval(function () {
        swipeNext();
      }, autoplayInterval);
      return function () {
        window.clearInterval(interval);
      };
    }, [autoplay, autoplayInterval, dragging]);

    function renderTrackInner() {
      if (loop) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: 'adm-swiper-track-inner'
        }, _react["default"].Children.map(validChildren, function (child, index) {
          var _style;

          return /*#__PURE__*/_react["default"].createElement(_web.animated.div, {
            className: 'adm-swiper-slide',
            style: (_style = {}, _style[isVertical ? 'y' : 'x'] = position.to(function (position) {
              var finalPosition = -position + index * 100;
              var totalWidth = count * 100;
              var flagWidth = totalWidth / 2;
              finalPosition = modulus(finalPosition + flagWidth, totalWidth) - flagWidth;
              return finalPosition + "%";
            }), _style[isVertical ? 'top' : 'left'] = "-" + index * 100 + "%", _style)
          }, child);
        }));
      } else {
        var _style2;

        return /*#__PURE__*/_react["default"].createElement(_web.animated.div, {
          className: 'adm-swiper-track-inner',
          style: (_style2 = {}, _style2[isVertical ? 'y' : 'x'] = position.to(function (position) {
            return -position + "%";
          }), _style2)
        }, _react["default"].Children.map(validChildren, function (child, index) {
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: 'adm-swiper-slide'
          }, child);
        }));
      }
    }

    var style = {
      '--slide-size': props.slideSize + "%",
      '--track-offset': props.trackOffset + "%"
    };
    return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames["default"])('adm-swiper', "adm-swiper-" + props.direction),
      style: style
    }, /*#__PURE__*/_react["default"].createElement("div", Object.assign({
      ref: trackRef,
      className: (0, _classnames["default"])('adm-swiper-track', {
        'adm-swiper-track-allow-touch-move': props.allowTouchMove
      }),
      onClickCapture: function onClickCapture(e) {
        if (draggingRef.current) {
          e.stopPropagation();
        }
      }
    }, props.allowTouchMove ? bind() : {}), renderTrackInner()), props.indicator === undefined ? /*#__PURE__*/_react["default"].createElement("div", {
      className: 'adm-swiper-indicator'
    }, /*#__PURE__*/_react["default"].createElement(_pageIndicator["default"], Object.assign({}, props.indicatorProps, {
      total: count,
      current: current,
      direction: props.direction
    }))) : props.indicator(count, current)));
  };
}));
exports.Swiper = Swiper;

function modulus(value, division) {
  var remainder = value % division;
  return remainder < 0 ? remainder + division : remainder;
}