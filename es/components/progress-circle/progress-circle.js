import React from 'react';
import { withNativeProps } from '../../utils/native-props';
import { mergeProps } from '../../utils/with-default-props';
var classPrefix = "adm-progress-circle";
export var ProgressCircle = function ProgressCircle(p) {
  var props = mergeProps({
    percent: 0,
    strokeColor: '#1677FF'
  }, p);
  var style = {
    '--percent': props.percent.toString()
  };
  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: "" + classPrefix,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-content"
  }, /*#__PURE__*/React.createElement("svg", {
    className: classPrefix + "-svg"
  }, /*#__PURE__*/React.createElement("circle", {
    className: classPrefix + "-track",
    fill: 'transparent'
  }), /*#__PURE__*/React.createElement("circle", {
    className: classPrefix + "-fill",
    fill: 'transparent'
  })), /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-info"
  }, props.children))));
};