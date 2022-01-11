import React, { useRef } from 'react';
import { useDrag } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import { Slide } from './slide';
import { convertPx } from '../../utils/convert-px';
import { bound } from '../../utils/bound';
var classPrefix = "adm-image-viewer";
export var Slides = function Slides(props) {
  var slideWidth = window.innerWidth + convertPx(16);

  var _useSpring = useSpring(function () {
    return {
      x: props.defaultIndex * slideWidth,
      config: {
        tension: 250,
        clamp: true
      }
    };
  }),
      x = _useSpring[0].x,
      api = _useSpring[1];

  var count = props.images.length;
  var dragLockRef = useRef(false);
  var bind = useDrag(function (state) {
    var _a;

    if (dragLockRef.current) return;
    var _state$offset = state.offset,
        offsetX = _state$offset[0];

    if (state.last) {
      var minIndex = Math.floor(offsetX / slideWidth);
      var maxIndex = minIndex + 1;
      var velocityOffset = Math.min(state.velocity[0] * 2000, slideWidth) * state.direction[0];
      var index = bound(bound(Math.round((offsetX + velocityOffset) / slideWidth), minIndex, maxIndex), 0, count - 1);
      (_a = props.onIndexChange) === null || _a === void 0 ? void 0 : _a.call(props, index);
      api.start({
        x: index * slideWidth
      });
    } else {
      api.start({
        x: offsetX,
        immediate: true
      });
    }
  }, {
    transform: function transform(_ref) {
      var x = _ref[0],
          y = _ref[1];
      return [-x, y];
    },
    from: function from() {
      return [x.get(), 0];
    },
    bounds: function bounds() {
      return {
        left: 0,
        right: (count - 1) * slideWidth
      };
    },
    rubberband: true,
    axis: 'x',
    pointer: {
      touch: true
    }
  });
  return /*#__PURE__*/React.createElement("div", Object.assign({
    className: classPrefix + "-slides"
  }, bind()), /*#__PURE__*/React.createElement(animated.div, {
    className: classPrefix + "-indicator"
  }, x.to(function (v) {
    var index = bound(Math.round(v / slideWidth), 0, count - 1);
    return index + 1 + " / " + count;
  })), /*#__PURE__*/React.createElement(animated.div, {
    className: classPrefix + "-slides-inner",
    style: {
      x: x.to(function (x) {
        return -x;
      })
    }
  }, props.images.map(function (image) {
    return /*#__PURE__*/React.createElement(Slide, {
      key: image,
      image: image,
      onTap: props.onTap,
      maxZoom: props.maxZoom,
      onZoomChange: function onZoomChange(zoom) {
        if (zoom !== 1) {
          var index = Math.round(x.get() / slideWidth);
          api.start({
            x: index * slideWidth
          });
        }
      },
      dragLockRef: dragLockRef
    });
  })));
};