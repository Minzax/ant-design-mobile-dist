import React from 'react';
import { withNativeProps } from '../../utils/native-props';
import classNames from 'classnames';
import { generateIntArray } from '../../utils/generate-int-array';
import { mergeProps } from '../../utils/with-default-props';
var classPrefix = 'adm-skeleton';
export var Skeleton = function Skeleton(props) {
  var _classNames;

  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classNames(classPrefix, (_classNames = {}, _classNames[classPrefix + "-animated"] = props.animated, _classNames))
  }));
};
export var SkeletonTitle = function SkeletonTitle(props) {
  return withNativeProps(props, /*#__PURE__*/React.createElement(Skeleton, {
    animated: props.animated,
    className: classPrefix + "-title"
  }));
};
var defaultSkeletonParagraphProps = {
  lineCount: 3
};
export var SkeletonParagraph = function SkeletonParagraph(p) {
  var props = mergeProps(defaultSkeletonParagraphProps, p);
  var keys = generateIntArray(1, props.lineCount);
  var node = /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-paragraph"
  }, keys.map(function (key) {
    return /*#__PURE__*/React.createElement(Skeleton, {
      key: key,
      animated: props.animated,
      className: classPrefix + "-paragraph-line"
    });
  }));
  return withNativeProps(props, node);
};