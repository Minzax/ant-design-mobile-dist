import React from 'react';
import { withNativeProps } from '../../utils/native-props';
import { RightOutline } from 'antd-mobile-icons';
import classNames from 'classnames';
var classPrefix = "adm-list-item";
export var ListItem = function ListItem(props) {
  var _a;

  var clickable = (_a = props.clickable) !== null && _a !== void 0 ? _a : !!props.onClick;
  var arrow = props.arrow === undefined ? clickable : props.arrow;
  var content = /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-content"
  }, props.prefix && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-content-prefix"
  }, props.prefix), /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-content-main"
  }, props.title && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-title"
  }, props.title), props.children, props.description && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-description"
  }, props.description)), props.extra && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-content-extra"
  }, props.extra), arrow && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-content-arrow"
  }, arrow === true ? /*#__PURE__*/React.createElement(RightOutline, null) : arrow));
  return withNativeProps(props, /*#__PURE__*/React.createElement(clickable ? 'a' : 'div', {
    className: classNames("" + classPrefix, clickable ? ['adm-plain-anchor'] : [], props.disabled && classPrefix + "-disabled"),
    onClick: props.disabled ? undefined : props.onClick
  }, content));
};