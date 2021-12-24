import React, { useMemo, useRef } from 'react';
import { withNativeProps } from '../../utils/native-props';
import classNames from 'classnames';
import Ticks from './ticks';
import Marks from './marks';
import Thumb from './thumb';
import { mergeProps } from '../../utils/with-default-props';
import { nearest } from '../../utils/nearest';
import { usePropsValue } from '../../utils/use-props-value';
var classPrefix = "adm-slider";
var defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  ticks: false,
  range: false,
  disabled: false
};
export var Slider = function Slider(p) {
  var _classNames;

  var _a;

  var props = mergeProps(defaultProps, p);
  var min = props.min,
      max = props.max,
      disabled = props.disabled,
      marks = props.marks,
      ticks = props.ticks,
      step = props.step;

  function sortValue(val) {
    return val.sort(function (a, b) {
      return a - b;
    });
  }

  function convertValue(value) {
    return props.range ? value : [props.min, value];
  }

  function reverseValue(value) {
    return props.range ? value : value[1];
  }

  function onAfterChange(value) {
    var _a;

    (_a = props.onAfterChange) === null || _a === void 0 ? void 0 : _a.call(props, reverseValue(value));
  }

  var _usePropsValue = usePropsValue({
    value: props.value,
    defaultValue: (_a = props.defaultValue) !== null && _a !== void 0 ? _a : props.range ? [min, min] : min,
    onChange: props.onChange
  }),
      rawValue = _usePropsValue[0],
      setRawValue = _usePropsValue[1];

  var sliderValue = sortValue(convertValue(rawValue));

  function setSliderValue(value) {
    var next = sortValue(value);
    var current = sliderValue;
    if (next[0] === current[0] && next[1] === current[1]) return;
    setRawValue(reverseValue(next));
  }

  var trackRef = useRef(null);
  var fillSize = 100 * (sliderValue[1] - sliderValue[0]) / (max - min) + "%";
  var fillStart = 100 * (sliderValue[0] - min) / (max - min) + "%"; // 计算要显示的点

  var pointList = useMemo(function () {
    if (marks) {
      return Object.keys(marks).map(parseFloat).sort(function (a, b) {
        return a - b;
      });
    } else {
      var points = [];

      for (var i = min; i <= max; i += step) {
        points.push(i);
      }

      return points;
    }
  }, [marks, ticks, step, min, max]);

  function getValueByPosition(position) {
    var newPosition = position < min ? min : position > max ? max : position;
    var value = min; // 显示了刻度点，就只能移动到点上

    if (pointList.length) {
      value = nearest(pointList, newPosition);
    } else {
      var lengthPerStep = 100 / ((max - min) / step);
      var steps = Math.round(newPosition / lengthPerStep);
      value = steps * lengthPerStep * (max - min) * 0.01 + min;
    }

    return value;
  }

  var dragLockRef = useRef(0);

  var onTrackClick = function onTrackClick(event) {
    if (dragLockRef.current > 0) return;
    event.stopPropagation();
    if (disabled) return;
    var track = trackRef.current;
    if (!track) return;
    var sliderOffsetLeft = track.getBoundingClientRect().left;
    var position = (event.clientX - sliderOffsetLeft) / Math.ceil(track.offsetWidth) * (max - min) + min;
    var targetValue = getValueByPosition(position);
    var nextSliderValue;

    if (props.range) {
      // 移动的滑块采用就近原则
      if (Math.abs(targetValue - sliderValue[0]) > Math.abs(targetValue - sliderValue[1])) {
        nextSliderValue = [sliderValue[0], targetValue];
      } else {
        nextSliderValue = [targetValue, sliderValue[1]];
      }
    } else {
      nextSliderValue = [props.min, targetValue];
    }

    setSliderValue(nextSliderValue);
    onAfterChange(nextSliderValue);
  };

  var valueBeforeDragRef = useRef();

  var renderThumb = function renderThumb(index) {
    return /*#__PURE__*/React.createElement(Thumb, {
      key: index,
      value: sliderValue[index],
      min: min,
      max: max,
      disabled: disabled,
      trackRef: trackRef,
      onDrag: function onDrag(position, first, last) {
        if (first) {
          dragLockRef.current += 1;
          valueBeforeDragRef.current = sliderValue;
        }

        var val = getValueByPosition(position);
        var valueBeforeDrag = valueBeforeDragRef.current;
        if (!valueBeforeDrag) return;
        var next = [].concat(valueBeforeDrag);
        next[index] = val;
        setSliderValue(next);

        if (last) {
          onAfterChange(next);
          window.setTimeout(function () {
            dragLockRef.current -= 1;
          }, 100);
        }
      }
    });
  };

  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classNames(classPrefix, (_classNames = {}, _classNames[classPrefix + "-disabled"] = disabled, _classNames))
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-track-container",
    onClick: onTrackClick
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-track",
    onClick: onTrackClick,
    ref: trackRef
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-fill",
    style: {
      width: fillSize,
      left: fillStart
    }
  }), props.ticks && /*#__PURE__*/React.createElement(Ticks, {
    points: pointList,
    min: min,
    max: max,
    lowerBound: sliderValue[0],
    upperBound: sliderValue[1]
  }), props.range && renderThumb(0), renderThumb(1))), marks && /*#__PURE__*/React.createElement(Marks, {
    min: min,
    max: max,
    marks: marks,
    lowerBound: sliderValue[0],
    upperBound: sliderValue[1]
  })));
};