import React from 'react';
import classNames from 'classnames';
import { withNativeProps } from '../../utils/native-props';
import { mergeProps } from '../../utils/with-default-props';
var classPrefix = "adm-divider";
var defaultProps = {
  contentPosition: 'center'
};
export var Divider = function Divider(p) {
  var props = mergeProps(defaultProps, p);
  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classNames(classPrefix, classPrefix + "-" + props.contentPosition)
  }, props.children && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-content"
  }, props.children)));
};