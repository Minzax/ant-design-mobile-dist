import React from 'react';
import { withNativeProps } from '../../utils/native-props';
import { mergeProps } from '../../utils/with-default-props';
var classPrefix = "adm-progress-bar";
export var ProgressBar = function ProgressBar(p) {
  var props = mergeProps({
    percent: 0
  }, p);
  var fillStyle = {
    width: props.percent + "%"
  };
  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classPrefix
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-trail"
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-fill",
    style: fillStyle
  }))));
};