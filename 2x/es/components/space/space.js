import React from 'react';
import classNames from 'classnames';
import { withNativeProps } from '../../utils/native-props';
import { mergeProps } from '../../utils/with-default-props';
var classPrefix = "adm-space";
var defaultProps = {
  direction: 'horizontal'
};
export var Space = function Space(p) {
  var _classNames;

  var props = mergeProps(defaultProps, p);
  var direction = props.direction,
      onClick = props.onClick;
  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classNames(classPrefix, (_classNames = {}, _classNames[classPrefix + "-wrap"] = props.wrap, _classNames[classPrefix + "-block"] = props.block, _classNames[classPrefix + "-" + direction] = true, _classNames[classPrefix + "-align-" + props.align] = !!props.align, _classNames[classPrefix + "-justify-" + props.justify] = !!props.justify, _classNames)),
    onClick: onClick
  }, React.Children.map(props.children, function (child) {
    return child !== null && child !== undefined && /*#__PURE__*/React.createElement("div", {
      className: classPrefix + "-item"
    }, child);
  })));
};