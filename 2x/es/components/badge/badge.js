import classNames from 'classnames';
import React from 'react';
import { withNativeProps } from '../../utils/native-props';
import { mergeProps } from '../../utils/with-default-props';
var classPrefix = "adm-badge";
export var dot = Symbol();
export var Badge = function Badge(p) {
  var _classNames;

  var props = mergeProps({
    color: '#FF411C'
  }, p);
  var content = props.content,
      color = props.color,
      children = props.children;
  var isDot = content === dot;
  var badgeCls = classNames(classPrefix, (_classNames = {}, _classNames[classPrefix + "-fixed"] = !!children, _classNames[classPrefix + "-dot"] = isDot, _classNames));
  var element = content ? withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: badgeCls,
    style: {
      backgroundColor: color
    }
  }, !isDot && content)) : null;
  return children ? /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-wrap"
  }, children, element) : element;
};