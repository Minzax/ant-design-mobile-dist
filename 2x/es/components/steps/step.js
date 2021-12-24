import React from 'react';
import classNames from 'classnames';
import { withNativeProps } from '../../utils/native-props';
var classPrefix = "adm-step";
export var Step = function Step(props) {
  var title = props.title,
      description = props.description,
      icon = props.icon,
      _props$status = props.status,
      status = _props$status === void 0 ? 'wait' : _props$status;
  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classNames("" + classPrefix, classPrefix + "-status-" + status)
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-indicator"
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-icon-container"
  }, icon)), /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-title"
  }, title), !!description && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-description"
  }, description))));
};