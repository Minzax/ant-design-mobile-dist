import React from 'react';
import classNames from 'classnames';
import { withNativeProps } from '../../utils/native-props';
import { mergeProps } from '../../utils/with-default-props';
var classPrefix = "adm-list";
var defaultProps = {
  mode: 'default'
};
export var List = function List(p) {
  var props = mergeProps(defaultProps, p);
  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classNames(classPrefix, classPrefix + "-" + props.mode)
  }, props.header && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-header"
  }, props.header), /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-body-inner"
  }, props.children))));
};