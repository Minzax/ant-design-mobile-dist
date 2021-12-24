import React from 'react';
import classNames from 'classnames';
import { iconRecord } from './error';
import { mergeProps } from '../../utils/with-default-props';
import { withNativeProps } from '../../utils/native-props';
import { useConfig } from '../config-provider';
var classPrefix = "adm-error-block";
var defaultProps = {
  status: 'default'
};
export var ErrorBlock = function ErrorBlock(p) {
  var _classNames;

  var props = mergeProps(defaultProps, p);
  var icon = iconRecord[props.status];

  var _useConfig = useConfig(),
      locale = _useConfig.locale;

  var contentPack = locale.ErrorBlock[props.status];
  var des = 'description' in props ? props.description : contentPack.description;
  var title = 'title' in props ? props.title : contentPack.title;
  var imageNode = /*#__PURE__*/React.createElement("img", {
    src: icon
  });

  if (props.image) {
    if (typeof props.image === 'string') {
      imageNode = /*#__PURE__*/React.createElement("img", {
        src: props.image
      });
    } else {
      imageNode = props.image;
    }
  }

  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classNames(classPrefix, (_classNames = {}, _classNames[classPrefix + "-full-page"] = props.fullPage, _classNames))
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-image"
  }, imageNode), /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-description"
  }, title && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-description-title"
  }, title), des && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-description-subtitle"
  }, des)), props.children && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-content"
  }, props.children)));
};