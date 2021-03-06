import React, { useRef } from 'react';
import { useDrag } from '@use-gesture/react';
import { ThumbIcon } from './thumb-icon';
const classPrefix = `adm-slider`;

const Thumb = props => {
  const {
    value,
    min,
    max,
    disabled,
    onDrag,
    icon
  } = props;
  const prevValue = useRef(value);

  const currentPosition = () => {
    return {
      left: `${(value - min) / (max - min) * 100}%`,
      right: 'auto'
    };
  };

  const bind = useDrag(state => {
    var _a;

    if (disabled) return;

    if (state.first) {
      prevValue.current = value;
    }

    const x = state.xy[0] - state.initial[0];
    const sliderOffsetWith = (_a = props.trackRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth;
    if (!sliderOffsetWith) return;
    const diff = x / Math.ceil(sliderOffsetWith) * (max - min);
    onDrag(prevValue.current + diff, state.first, state.last);
  }, {
    axis: 'x',
    pointer: {
      touch: true
    }
  });
  return React.createElement("div", Object.assign({
    className: `${classPrefix}-thumb-container`,
    style: currentPosition()
  }, bind()), React.createElement("div", {
    className: `${classPrefix}-thumb`
  }, icon ? icon : React.createElement(ThumbIcon, {
    className: `${classPrefix}-thumb-icon`
  })));
};

export default Thumb;