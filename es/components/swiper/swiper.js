import React, { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { withNativeProps } from '../../utils/native-props';
import { mergeProps } from '../../utils/with-default-props';
import classNames from 'classnames';
import { SwiperItem } from './swiper-item';
import { devWarning } from '../../utils/dev-log';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import PageIndicator from '../page-indicator';
import { staged } from 'staged-components';
import { useRefState } from '../../utils/use-ref-state';
import { bound } from '../../utils/bound';
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
export var Swiper = /*#__PURE__*/forwardRef(staged(function (p, ref) {
  var props = mergeProps(defaultProps, p);
  var isVertical = props.direction === 'vertical';
  var slideRatio = props.slideSize / 100;
  var offsetRatio = props.trackOffset / 100;

  var _useMemo = useMemo(function () {
    var count = 0;
    var validChildren = React.Children.map(props.children, function (child) {
      if (! /*#__PURE__*/React.isValidElement(child)) return null;

      if (child.type !== SwiperItem) {
        devWarning('Swiper', 'The children of `Swiper` must be `Swiper.Item` components.');
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
    devWarning('Swiper', '`Swiper` needs at least one child.');
    return null;
  }

  return function () {
    var loop = props.loop;

    if (slideRatio * (count - 1) < 1) {
      loop = false;
    }

    var trackRef = useRef(null);

    function getSlidePixels() {
      var track = trackRef.current;
      if (!track) return 0;
      var trackPixels = isVertical ? track.offsetHeight : track.offsetWidth;
      return trackPixels * props.slideSize / 100;
    }

    var _useState = useState(props.defaultIndex),
        current = _useState[0],
        setCurrent = _useState[1];

    var _useRefState = useRefState(false),
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

      return bound(current, min, max);
    }

    var _useSpring = useSpring(function () {
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

    var bind = useDrag(function (state) {
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
        swipeTo(bound(index, minIndex, maxIndex));
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
        var _i = bound(index, 0, count - 1);

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

    useImperativeHandle(ref, function () {
      return {
        swipeTo: swipeTo,
        swipeNext: swipeNext,
        swipePrev: swipePrev
      };
    });
    useLayoutEffect(function () {
      var maxIndex = validChildren.length - 1;

      if (current > maxIndex) {
        swipeTo(maxIndex, true);
      }
    });
    var autoplay = props.autoplay,
        autoplayInterval = props.autoplayInterval;
    useEffect(function () {
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
        return /*#__PURE__*/React.createElement("div", {
          className: 'adm-swiper-track-inner'
        }, React.Children.map(validChildren, function (child, index) {
          var _style;

          return /*#__PURE__*/React.createElement(animated.div, {
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

        return /*#__PURE__*/React.createElement(animated.div, {
          className: 'adm-swiper-track-inner',
          style: (_style2 = {}, _style2[isVertical ? 'y' : 'x'] = position.to(function (position) {
            return -position + "%";
          }), _style2)
        }, React.Children.map(validChildren, function (child, index) {
          return /*#__PURE__*/React.createElement("div", {
            className: 'adm-swiper-slide'
          }, child);
        }));
      }
    }

    var style = {
      '--slide-size': props.slideSize + "%",
      '--track-offset': props.trackOffset + "%"
    };
    return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
      className: classNames('adm-swiper', "adm-swiper-" + props.direction),
      style: style
    }, /*#__PURE__*/React.createElement("div", Object.assign({
      ref: trackRef,
      className: classNames('adm-swiper-track', {
        'adm-swiper-track-allow-touch-move': props.allowTouchMove
      }),
      onClickCapture: function onClickCapture(e) {
        if (draggingRef.current) {
          e.stopPropagation();
        }
      }
    }, props.allowTouchMove ? bind() : {}), renderTrackInner()), props.indicator === undefined ? /*#__PURE__*/React.createElement("div", {
      className: 'adm-swiper-indicator'
    }, /*#__PURE__*/React.createElement(PageIndicator, Object.assign({}, props.indicatorProps, {
      total: count,
      current: current,
      direction: props.direction
    }))) : props.indicator(count, current)));
  };
}));

function modulus(value, division) {
  var remainder = value % division;
  return remainder < 0 ? remainder + division : remainder;
}