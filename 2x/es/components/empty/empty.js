import React from 'react';
import classNames from 'classnames';
import { mergeProps } from '../../utils/with-default-props';
import { withNativeProps } from '../../utils/native-props';
import EmptyIcon from '../../assets/empty-icon.svg';
var classPrefix = "adm-empty";
var defaultProps = {
  image: EmptyIcon
};
export var Empty = function Empty(p) {
  var props = mergeProps(defaultProps, p);
  var imageNode = typeof props.image === 'string' ? /*#__PURE__*/React.createElement("img", {
    className: classPrefix + "-image",
    style: props.imageStyle,
    src: props.image,
    alt: 'empty'
  }) : props.image;
  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classPrefix
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-image-container"
  }, imageNode), props.description && /*#__PURE__*/React.createElement("div", {
    className: classNames(classPrefix + "-description")
  }, props.description)));
};