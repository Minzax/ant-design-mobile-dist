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

var _useRefState = require("../../utils/use-ref-state");

var _bound = require("../../utils/bound");

var _ahooks = require("ahooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const defaultProps = {
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
const Swiper = (0, _react.forwardRef)((0, _stagedComponents.staged)((p, ref) => {
  const props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  const isVertical = props.direction === 'vertical';
  const slideRatio = props.slideSize / 100;
  const offsetRatio = props.trackOffset / 100;
  const {
    validChildren,
    count
  } = (0, _react.useMemo)(() => {
    let count = 0;

    const validChildren = _react.default.Children.map(props.children, child => {
      if (!_react.default.isValidElement(child)) return null;

      if (child.type !== _swiperItem.SwiperItem) {
        (0, _devLog.devWarning)('Swiper', 'The children of `Swiper` must be `Swiper.Item` components.');
        return null;
      }

      count++;
      return child;
    });

    return {
      validChildren,
      count
    };
  }, [props.children]);

  if (count === 0 || !validChildren) {
    (0, _devLog.devWarning)('Swiper', '`Swiper` needs at least one child.');
    return null;
  }

  return () => {
    let loop = props.loop;

    if (slideRatio * (count - 1) < 1) {
      loop = false;
    }

    const trackRef = (0, _react.useRef)(null);

    function getSlidePixels() {
      const track = trackRef.current;
      if (!track) return 0;
      const trackPixels = isVertical ? track.offsetHeight : track.offsetWidth;
      return trackPixels * props.slideSize / 100;
    }

    const [current, setCurrent] = (0, _react.useState)(props.defaultIndex);
    (0, _ahooks.useUpdateEffect)(() => {
      var _a;

      (_a = props.onIndexChange) === null || _a === void 0 ? void 0 : _a.call(props, current);
    }, [current]);
    const [dragging, setDragging, draggingRef] = (0, _useRefState.useRefState)(false);

    function boundIndex(current) {
      let min = 0;
      let max = count - 1;

      if (props.stuckAtBoundary) {
        min += offsetRatio / slideRatio;
        max -= (1 - slideRatio - offsetRatio) / slideRatio;
      }

      return (0, _bound.bound)(current, min, max);
    }

    const [{
      position
    }, api] = (0, _web.useSpring)(() => ({
      position: boundIndex(current) * 100,
      config: {
        tension: 200,
        friction: 30
      },
      onRest: () => {
        if (draggingRef.current) return;
        if (!loop) return;
        const rawX = position.get();
        const totalWidth = 100 * count;
        const standardPosition = modulus(rawX, totalWidth);
        if (standardPosition === rawX) return;
        api.start({
          position: standardPosition,
          immediate: true
        });
      }
    }), [count]);
    const bind = (0, _react2.useDrag)(state => {
      const slidePixels = getSlidePixels();
      if (!slidePixels) return;
      const paramIndex = isVertical ? 1 : 0;
      const offset = state.offset[paramIndex];
      const direction = state.direction[paramIndex];
      const velocity = state.velocity[paramIndex];
      setDragging(true);

      if (!state.last) {
        api.start({
          position: offset * 100 / slidePixels,
          immediate: true
        });
      } else {
        const minIndex = Math.floor(offset / slidePixels);
        const maxIndex = minIndex + 1;
        const index = Math.round((offset + velocity * 2000 * direction) / slidePixels);
        swipeTo((0, _bound.bound)(index, minIndex, maxIndex));
        window.setTimeout(() => {
          setDragging(false);
        });
      }
    }, {
      transform: ([x, y]) => [-x, -y],
      from: () => {
        const slidePixels = getSlidePixels();
        return [position.get() / 100 * slidePixels, position.get() / 100 * slidePixels];
      },
      bounds: () => {
        if (loop) return {};
        const slidePixels = getSlidePixels();
        const lowerBound = boundIndex(0) * slidePixels;
        const upperBound = boundIndex(count - 1) * slidePixels;
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

    function swipeTo(index, immediate = false) {
      const roundedIndex = Math.round(index);
      const targetIndex = loop ? modulus(roundedIndex, count) : (0, _bound.bound)(roundedIndex, 0, count - 1);
      setCurrent(targetIndex);
      api.start({
        position: (loop ? roundedIndex : boundIndex(roundedIndex)) * 100,
        immediate
      });
    }

    function swipeNext() {
      swipeTo(Math.round(position.get() / 100) + 1);
    }

    function swipePrev() {
      swipeTo(Math.round(position.get() / 100) - 1);
    }

    (0, _react.useImperativeHandle)(ref, () => ({
      swipeTo,
      swipeNext,
      swipePrev
    }));
    (0, _ahooks.useIsomorphicLayoutEffect)(() => {
      const maxIndex = validChildren.length - 1;

      if (current > maxIndex) {
        swipeTo(maxIndex, true);
      }
    });
    const {
      autoplay,
      autoplayInterval
    } = props;
    (0, _react.useEffect)(() => {
      if (!autoplay || dragging) return;
      const interval = window.setInterval(() => {
        swipeNext();
      }, autoplayInterval);
      return () => {
        window.clearInterval(interval);
      };
    }, [autoplay, autoplayInterval, dragging]);

    function renderTrackInner() {
      if (loop) {
        return _react.default.createElement("div", {
          className: 'adm-swiper-track-inner'
        }, _react.default.Children.map(validChildren, (child, index) => {
          return _react.default.createElement(_web.animated.div, {
            className: 'adm-swiper-slide',
            style: {
              [isVertical ? 'y' : 'x']: position.to(position => {
                let finalPosition = -position + index * 100;
                const totalWidth = count * 100;
                const flagWidth = totalWidth / 2;
                finalPosition = modulus(finalPosition + flagWidth, totalWidth) - flagWidth;
                return `${finalPosition}%`;
              }),
              [isVertical ? 'top' : 'left']: `-${index * 100}%`
            }
          }, child);
        }));
      } else {
        return _react.default.createElement(_web.animated.div, {
          className: 'adm-swiper-track-inner',
          style: {
            [isVertical ? 'y' : 'x']: position.to(position => `${-position}%`)
          }
        }, _react.default.Children.map(validChildren, child => {
          return _react.default.createElement("div", {
            className: 'adm-swiper-slide'
          }, child);
        }));
      }
    }

    const style = {
      '--slide-size': `${props.slideSize}%`,
      '--track-offset': `${props.trackOffset}%`
    };
    return (0, _nativeProps.withNativeProps)(props, _react.default.createElement("div", {
      className: (0, _classnames.default)('adm-swiper', `adm-swiper-${props.direction}`),
      style: style
    }, _react.default.createElement("div", Object.assign({
      ref: trackRef,
      className: (0, _classnames.default)('adm-swiper-track', {
        'adm-swiper-track-allow-touch-move': props.allowTouchMove
      }),
      onClickCapture: e => {
        if (draggingRef.current) {
          e.stopPropagation();
        }
      }
    }, props.allowTouchMove ? bind() : {}), renderTrackInner()), props.indicator === undefined ? _react.default.createElement("div", {
      className: 'adm-swiper-indicator'
    }, _react.default.createElement(_pageIndicator.default, Object.assign({}, props.indicatorProps, {
      total: count,
      current: current,
      direction: props.direction
    }))) : props.indicator(count, current)));
  };
}));
exports.Swiper = Swiper;

function modulus(value, division) {
  const remainder = value % division;
  return remainder < 0 ? remainder + division : remainder;
}