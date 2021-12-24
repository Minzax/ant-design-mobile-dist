import React from 'react';
import { mergeProps } from '../../utils/with-default-props';
import { withNativeProps } from '../../utils/native-props';
import classNames from 'classnames';
var classPrefix = "adm-tag";
var colorRecord = {
  "default": '#666666',
  primary: 'var(--adm-color-primary, #1677ff)',
  success: 'var(--adm-color-success, #00b578)',
  warning: 'var(--adm-color-warning, #ff8f1f)',
  danger: 'var(--adm-color-danger, #ff3141)'
};
var defaultProps = {
  color: 'default',
  fill: 'solid',
  round: false
};
export var Tag = function Tag(p) {
  var _classNames;

  var _a;

  var props = mergeProps(defaultProps, p);
  var color = (_a = colorRecord[props.color]) !== null && _a !== void 0 ? _a : props.color;
  var style = {
    '--border-color': color,
    '--text-color': props.fill === 'outline' ? color : '#ffffff',
    '--background-color': props.fill === 'outline' ? 'transparent' : color
  };
  return withNativeProps(props, /*#__PURE__*/React.createElement("span", {
    style: style,
    onClick: props.onClick,
    className: classNames(classPrefix, (_classNames = {}, _classNames[classPrefix + "-round"] = props.round, _classNames))
  }, props.children));
};