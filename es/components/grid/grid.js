import { mergeProps } from '../../utils/with-default-props';
import React from 'react';
import { withNativeProps } from '../../utils/native-props';
import { toCSSLength } from '../../utils/to-css-length';
var classPrefix = "adm-grid";
export var Grid = function Grid(props) {
  var style = {
    '--columns': props.columns.toString()
  };
  var gap = props.gap;

  if (gap !== undefined) {
    if (Array.isArray(gap)) {
      style['--gap-horizontal'] = toCSSLength(gap[0]);
      style['--gap-vertical'] = toCSSLength(gap[1]);
    } else {
      style['--gap'] = toCSSLength(gap);
    }
  }

  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classPrefix,
    style: style
  }, props.children));
};
export var GridItem = function GridItem(p) {
  var props = mergeProps({
    span: 1
  }, p);
  var itemStyle = {
    '--item-span': props.span
  };
  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-item",
    style: itemStyle,
    onClick: props.onClick
  }, props.children));
};