import React from 'react';
import classNames from 'classnames';
import { CheckCircleFill, CloseCircleFill, InformationCircleFill, ClockCircleFill, ExclamationCircleFill } from 'antd-mobile-icons';
import { withNativeProps } from '../../utils/native-props';
var classPrefix = "adm-result";
var iconRecord = {
  success: CheckCircleFill,
  error: CloseCircleFill,
  info: InformationCircleFill,
  waiting: ClockCircleFill,
  warning: ExclamationCircleFill
};
export var Result = function Result(props) {
  var status = props.status,
      title = props.title,
      description = props.description,
      icon = props.icon;
  if (!status) return null;
  var resultIcon = icon || /*#__PURE__*/React.createElement(iconRecord[status]);
  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classNames(classPrefix, classPrefix + "-" + status)
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-icon"
  }, resultIcon), /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-title"
  }, title), description ? /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-description"
  }, description) : null));
};