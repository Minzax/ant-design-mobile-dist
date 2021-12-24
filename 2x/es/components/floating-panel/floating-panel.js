import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { withNativeProps } from '../../utils/native-props';
import { useDrag } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import { supportsPassive } from '../../utils/supports-passive';
import { nearest } from '../../utils/nearest';
export var FloatingPanel = /*#__PURE__*/forwardRef(function (props, ref) {
  var _a;

  var anchors = props.anchors;
  var maxHeight = (_a = anchors[anchors.length - 1]) !== null && _a !== void 0 ? _a : window.innerHeight;
  var possibles = anchors.map(function (x) {
    return -x;
  });
  var elementRef = useRef(null);
  var headerRef = useRef(null);
  var contentRef = useRef(null);

  var _useState = useState(false),
      pulling = _useState[0],
      setPulling = _useState[1];

  var pullingRef = useRef(false);
  var bounds = {
    top: possibles[possibles.length - 1],
    bottom: possibles[0]
  };

  var _useSpring = useSpring(function () {
    return {
      y: bounds.bottom,
      config: {
        tension: 300
      }
    };
  }),
      y = _useSpring[0].y,
      api = _useSpring[1];

  useDrag(function (state) {
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
      nextY = nearest(possibles, offsetY);
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
    eventOptions: supportsPassive ? {
      passive: false
    } : false
  });
  useImperativeHandle(ref, function () {
    return {
      setHeight: function setHeight(height, options) {
        api.start({
          y: -height,
          immediate: options === null || options === void 0 ? void 0 : options.immediate
        });
      }
    };
  }, [api]);
  return withNativeProps(props, /*#__PURE__*/React.createElement(animated.div, {
    ref: elementRef,
    className: 'adm-floating-panel',
    style: {
      height: maxHeight,
      y: y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: 'adm-floating-panel-mask',
    style: {
      display: pulling ? 'block' : 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: 'adm-floating-panel-header',
    ref: headerRef
  }, /*#__PURE__*/React.createElement("div", {
    className: 'adm-floating-panel-bar'
  })), /*#__PURE__*/React.createElement("div", {
    className: 'adm-floating-panel-content',
    ref: contentRef
  }, props.children)));
});