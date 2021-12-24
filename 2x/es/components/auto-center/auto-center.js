import React from 'react';
import { withNativeProps } from '../../utils/native-props';
var classPrefix = 'adm-auto-center';
export var AutoCenter = function AutoCenter(props) {
  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classPrefix
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-content"
  }, props.children)));
};