import React, { forwardRef, useImperativeHandle } from 'react';
import Tooltip from 'rc-tooltip';
import classNames from 'classnames';
import { usePropsValue } from '../../utils/use-props-value';
import { mergeProps } from '../../utils/with-default-props';
var classPrefix = "adm-popover";
var enterClassName = 'entering';
var leaveClassName = 'leaving';
var defaultProps = {
  defaultVisible: false
};
export var Popover = /*#__PURE__*/forwardRef(function (p, ref) {
  var props = mergeProps(defaultProps, p);
  var _props$mode = props.mode,
      mode = _props$mode === void 0 ? 'light' : _props$mode;

  var _usePropsValue = usePropsValue({
    value: props.visible,
    defaultValue: props.defaultVisible,
    onChange: props.onVisibleChange
  }),
      visible = _usePropsValue[0],
      setVisible = _usePropsValue[1];

  useImperativeHandle(ref, function () {
    return {
      show: function show() {
        return setVisible(true);
      },
      hide: function hide() {
        return setVisible(false);
      },
      visible: visible
    };
  }, [visible]);
  return /*#__PURE__*/React.createElement(Tooltip, Object.assign({}, props, {
    overlayClassName: classNames(classPrefix + "-" + mode, props.overlayClassName),
    destroyTooltipOnHide: props.destroyOnHide,
    prefixCls: classPrefix,
    getTooltipContainer: props.getContainer || function () {
      return document.body;
    },
    visible: visible,
    onVisibleChange: setVisible,
    trigger: props.trigger,
    motion: {
      motionName: {
        appear: enterClassName,
        appearActive: enterClassName,
        enter: enterClassName,
        enterActive: enterClassName,
        leaveActive: leaveClassName,
        leave: leaveClassName
      },
      motionDeadline: 200
    },
    overlay: /*#__PURE__*/React.createElement("div", {
      className: classPrefix + "-inner-content"
    }, props.content)
  }), props.children);
});