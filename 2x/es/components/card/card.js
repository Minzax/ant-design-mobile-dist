import React from 'react';
import classNames from 'classnames';
import { withNativeProps } from '../../utils/native-props';
var classPrefix = "adm-card";
export var Card = function Card(props) {
  var renderHeader = function renderHeader() {
    if (!(props.title || props.extra)) {
      return null;
    }

    return /*#__PURE__*/React.createElement("div", {
      className: classNames(classPrefix + "-header", props.headerClassName),
      style: props.headerStyle,
      onClick: props.onHeaderClick
    }, /*#__PURE__*/React.createElement("div", {
      className: classPrefix + "-header-title"
    }, props.title), props.extra);
  };

  var renderBody = function renderBody() {
    if (!props.children) {
      return null;
    }

    return /*#__PURE__*/React.createElement("div", {
      className: classNames(classPrefix + "-body", props.bodyClassName),
      style: props.bodyStyle,
      onClick: props.onBodyClick
    }, props.children);
  };

  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classPrefix,
    onClick: props.onClick
  }, renderHeader(), renderBody()));
};