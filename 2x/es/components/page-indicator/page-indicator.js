import React, { memo } from 'react';
import { withNativeProps } from '../../utils/native-props';
import classNames from 'classnames';
import { mergeProps } from '../../utils/with-default-props';
var classPrefix = "adm-page-indicator";
var defaultProps = {
  color: 'primary',
  direction: 'horizontal'
};
export var PageIndicator = /*#__PURE__*/memo(function (p) {
  var props = mergeProps(defaultProps, p);
  var dots = [];

  for (var i = 0; i < props.total; i++) {
    var _classNames;

    dots.push( /*#__PURE__*/React.createElement("div", {
      key: i,
      className: classNames(classPrefix + "-dot", (_classNames = {}, _classNames[classPrefix + "-dot-active"] = props.current === i, _classNames))
    }));
  }

  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classNames(classPrefix, classPrefix + "-" + props.direction, classPrefix + "-color-" + props.color)
  }, dots));
});