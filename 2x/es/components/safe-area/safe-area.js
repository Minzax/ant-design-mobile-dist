import { withNativeProps } from '../../utils/native-props';
import React from 'react';
import classNames from 'classnames';
var classPrefix = 'adm-safe-area';
export var SafeArea = function SafeArea(props) {
  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classNames(classPrefix, classPrefix + "-position-" + props.position)
  }));
};