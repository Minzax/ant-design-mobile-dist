import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import { animated, useSpring } from '@react-spring/web';
import { useThrottleFn } from 'ahooks';
var classPrefix = "adm-scroll-mask";
export var ScrollMask = function ScrollMask(props) {
  var maskRef = useRef(null);

  var _useSpring = useSpring(function () {
    return {
      leftMaskOpacity: 0,
      rightMaskOpacity: 0,
      config: {
        clamp: true
      }
    };
  }),
      _useSpring$ = _useSpring[0],
      leftMaskOpacity = _useSpring$.leftMaskOpacity,
      rightMaskOpacity = _useSpring$.rightMaskOpacity,
      api = _useSpring[1];

  var _useThrottleFn = useThrottleFn(function (immediate) {
    if (immediate === void 0) {
      immediate = false;
    }

    var mask = maskRef.current;
    if (!mask) return;
    var scrollEl = props.scrollTrackRef.current;
    if (!scrollEl) return;
    var scrollLeft = scrollEl.scrollLeft;
    var showLeftMask = scrollLeft > 0;
    var showRightMask = scrollLeft + scrollEl.offsetWidth < scrollEl.scrollWidth;
    api.start({
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

  useEffect(function () {
    updateMask(true);
  }, []);
  useEffect(function () {
    var scrollEl = props.scrollTrackRef.current;
    if (!scrollEl) return;
    scrollEl.addEventListener('scroll', updateMask);
    return function () {
      return scrollEl.removeEventListener('scroll', updateMask);
    };
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(animated.div, {
    ref: maskRef,
    className: classNames(classPrefix, classPrefix + "-left"),
    style: {
      opacity: leftMaskOpacity
    }
  }), /*#__PURE__*/React.createElement(animated.div, {
    className: classNames(classPrefix, classPrefix + "-right"),
    style: {
      opacity: rightMaskOpacity
    }
  }));
};