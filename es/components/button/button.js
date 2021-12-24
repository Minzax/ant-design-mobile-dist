import React from 'react';
import classNames from 'classnames';
import Loading from '../loading';
import { mergeProps } from '../../utils/with-default-props';
import { withNativeProps } from '../../utils/native-props';
var classPrefix = "adm-button";
var defaultProps = {
  color: 'default',
  fill: 'solid',
  block: false,
  loading: false,
  type: 'button',
  shape: 'default',
  size: 'middle'
};
export var Button = function Button(p) {
  var _classNames;

  var props = mergeProps(defaultProps, p);
  var disabled = props.disabled || props.loading;
  return withNativeProps(props, /*#__PURE__*/React.createElement("button", {
    type: props.type,
    onClick: props.onClick,
    className: classNames(classPrefix, props.color ? classPrefix + "-" + props.color : null, (_classNames = {}, _classNames[classPrefix + "-block"] = props.block, _classNames[classPrefix + "-disabled"] = disabled, _classNames[classPrefix + "-fill-outline"] = props.fill === 'outline', _classNames[classPrefix + "-fill-none"] = props.fill === 'none', _classNames[classPrefix + "-mini"] = props.size === 'mini', _classNames[classPrefix + "-small"] = props.size === 'small', _classNames[classPrefix + "-large"] = props.size === 'large', _classNames[classPrefix + "-loading"] = props.loading, _classNames), classPrefix + "-shape-" + props.shape),
    disabled: disabled
  }, props.loading ? /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-loading-wrapper"
  }, /*#__PURE__*/React.createElement(Loading, {
    color: 'currentColor'
  }), props.loadingText) : props.children));
};