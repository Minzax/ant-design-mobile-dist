import classNames from 'classnames';
import React from 'react';
import { withNativeProps } from '../../utils/native-props';
import { useShouldRender } from '../../utils/use-should-render';
import { DownFill } from 'antd-mobile-icons';
var classPrefix = "adm-dropdown-item";

var Item = function Item(props) {
  var _classNames, _classNames2;

  var cls = classNames(classPrefix, (_classNames = {}, _classNames[classPrefix + "-active"] = props.active, _classNames[classPrefix + "-highlight"] = props.highlight, _classNames));
  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: cls,
    onClick: props.onClick
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: classPrefix + "-title-text"
  }, props.title), /*#__PURE__*/React.createElement("span", {
    className: classNames(classPrefix + "-title-arrow", (_classNames2 = {}, _classNames2[classPrefix + "-title-arrow-active"] = props.active, _classNames2))
  }, props.arrow === undefined ? /*#__PURE__*/React.createElement(DownFill, null) : props.arrow))));
};

export default Item;
export var ItemChildrenWrap = function ItemChildrenWrap(props) {
  var _classNames3;

  var _props$active = props.active,
      active = _props$active === void 0 ? false : _props$active;
  var shouldRender = useShouldRender(active, props.forceRender, props.destroyOnClose);
  var cls = classNames(classPrefix + "-content", (_classNames3 = {}, _classNames3[classPrefix + "-content-hidden"] = !active, _classNames3));
  return shouldRender ? /*#__PURE__*/React.createElement("div", {
    className: cls,
    onClick: props.onClick
  }, props.children) : null;
};