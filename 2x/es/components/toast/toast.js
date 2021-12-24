import React, { useMemo } from 'react';
import classNames from 'classnames';
import { CheckOutline, CloseOutline } from 'antd-mobile-icons';
import Loading from '../loading';
import Mask from '../mask';
import { mergeProps } from '../../utils/with-default-props';
import AutoCenter from '../auto-center';
var classPrefix = "adm-toast";
var defaultProps = {
  maskClickable: true,
  stopPropagation: ['click']
};
export var InternalToast = function InternalToast(p) {
  var props = mergeProps(defaultProps, p);
  var maskClickable = props.maskClickable,
      content = props.content,
      icon = props.icon,
      position = props.position;
  var iconElement = useMemo(function () {
    if (icon === null || icon === undefined) return null;

    switch (icon) {
      case 'success':
        return /*#__PURE__*/React.createElement(CheckOutline, null);

      case 'fail':
        return /*#__PURE__*/React.createElement(CloseOutline, null);

      case 'loading':
        return /*#__PURE__*/React.createElement(Loading, {
          color: 'white',
          className: classPrefix + "-loading"
        });

      default:
        return icon;
    }
  }, [icon]);
  var top = useMemo(function () {
    switch (position) {
      case 'top':
        return '20%';

      case 'bottom':
        return '80%';

      default:
        return '50%';
    }
  }, [position]);
  return /*#__PURE__*/React.createElement(Mask, {
    visible: props.visible,
    destroyOnClose: true,
    opacity: 0,
    disableBodyScroll: !maskClickable,
    getContainer: props.getContainer,
    afterClose: props.afterClose,
    style: Object.assign({
      pointerEvents: maskClickable ? 'none' : 'auto'
    }, props.maskStyle),
    className: classNames(classPrefix + "-mask", props.maskClassName),
    stopPropagation: props.stopPropagation
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      top: top
    },
    className: classNames(classPrefix + "-wrap", icon ? classPrefix + "-wrap-icon" : classPrefix + "-wrap-text")
  }, iconElement && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-icon"
  }, iconElement), /*#__PURE__*/React.createElement(AutoCenter, null, content)));
};