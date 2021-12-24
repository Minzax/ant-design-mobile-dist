import React from 'react';
import classNames from 'classnames';
var classPrefix = "adm-slider";

var Ticks = function Ticks(_ref) {
  var points = _ref.points,
      max = _ref.max,
      min = _ref.min,
      upperBound = _ref.upperBound,
      lowerBound = _ref.lowerBound;
  var range = max - min;
  var elements = points.map(function (point) {
    var _classNames;

    var offset = Math.abs(point - min) / range * 100 + "%";
    var isActived = point <= upperBound && point >= lowerBound;
    var style = {
      left: offset
    };
    var pointClassName = classNames((_classNames = {}, _classNames[classPrefix + "-tick"] = true, _classNames[classPrefix + "-tick-active"] = isActived, _classNames));
    return /*#__PURE__*/React.createElement("span", {
      className: pointClassName,
      style: style,
      key: point
    });
  });
  return /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-ticks"
  }, elements);
};

export default Ticks;