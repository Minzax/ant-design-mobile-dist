import React from 'react';
import classNames from 'classnames';
var classPrefix = "adm-slider-mark";

var Marks = function Marks(_ref) {
  var marks = _ref.marks,
      upperBound = _ref.upperBound,
      lowerBound = _ref.lowerBound,
      max = _ref.max,
      min = _ref.min;
  var marksKeys = Object.keys(marks);
  var range = max - min;
  var elements = marksKeys.map(parseFloat).sort(function (a, b) {
    return a - b;
  }).filter(function (point) {
    return point >= min && point <= max;
  }).map(function (point) {
    var _classNames;

    var markPoint = marks[point];

    if (!markPoint && markPoint !== 0) {
      return null;
    }

    var isActive = point <= upperBound && point >= lowerBound;
    var markClassName = classNames((_classNames = {}, _classNames[classPrefix + "-text"] = true, _classNames[classPrefix + "-text-active"] = isActive, _classNames));
    var style = {
      left: (point - min) / range * 100 + "%"
    };
    return /*#__PURE__*/React.createElement("span", {
      className: markClassName,
      style: style,
      key: point
    }, markPoint);
  });
  return /*#__PURE__*/React.createElement("div", {
    className: classPrefix
  }, elements);
};

export default Marks;