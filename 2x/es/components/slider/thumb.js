import React, { useRef } from 'react';
import { useDrag } from '@use-gesture/react';
var classPrefix = "adm-slider";

var Thumb = function Thumb(props) {
  var value = props.value,
      min = props.min,
      max = props.max,
      disabled = props.disabled,
      onDrag = props.onDrag;
  var prevValue = useRef(value);

  var currentPosition = function currentPosition() {
    return {
      left: (value - min) / (max - min) * 100 + "%",
      right: 'auto'
    };
  };

  var bind = useDrag(function (state) {
    var _a;

    if (disabled) return;

    if (state.first) {
      prevValue.current = value;
    }

    var x = state.xy[0] - state.initial[0];
    var sliderOffsetWith = (_a = props.trackRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth;
    if (!sliderOffsetWith) return;
    var diff = x / Math.ceil(sliderOffsetWith) * (max - min);
    onDrag(prevValue.current + diff, state.first, state.last);
  }, {
    axis: 'x',
    pointer: {
      touch: true
    }
  });
  return /*#__PURE__*/React.createElement("div", Object.assign({
    className: classPrefix + "-thumb-container",
    style: currentPosition()
  }, bind()), /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-thumb"
  }));
};

export default Thumb;