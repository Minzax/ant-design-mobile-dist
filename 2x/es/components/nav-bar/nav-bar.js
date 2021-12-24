import React from 'react';
import classNames from 'classnames';
import { LeftOutline } from 'antd-mobile-icons';
import { withNativeProps } from '../../utils/native-props';
import { mergeProps } from '../../utils/with-default-props';
var classPrefix = "adm-nav-bar";
var defaultProps = {
  back: '',
  backArrow: true
};
export var NavBar = function NavBar(p) {
  var props = mergeProps(defaultProps, p);
  var back = props.back,
      backArrow = props.backArrow;
  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classNames(classPrefix)
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-left",
    role: 'button'
  }, back !== null && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-back",
    onClick: props.onBack
  }, backArrow && /*#__PURE__*/React.createElement("span", {
    className: classPrefix + "-back-arrow"
  }, backArrow === true ? /*#__PURE__*/React.createElement(LeftOutline, null) : backArrow), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": 'true'
  }, back)), props.left), /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-title"
  }, props.children), /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-right"
  }, props.right)));
};