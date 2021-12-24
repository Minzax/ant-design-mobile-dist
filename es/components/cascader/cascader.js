import React, { useState, useEffect } from 'react';
import Popup from '../popup';
import { mergeProps } from '../../utils/with-default-props';
import { withNativeProps } from '../../utils/native-props';
import { usePropsValue } from '../../utils/use-props-value';
import CascaderView from '../cascader-view';
import { useConfig } from '../config-provider';
import { useCascaderValueExtend } from '../cascader-view/use-cascader-value-extend';
var classPrefix = "adm-cascader";
var defaultProps = {
  defaultValue: []
};
export var Cascader = function Cascader(p) {
  var _a;

  var _useConfig = useConfig(),
      locale = _useConfig.locale;

  var props = mergeProps(defaultProps, {
    confirmText: locale.common.confirm,
    cancelText: locale.common.cancel,
    placeholder: locale.Cascader.placeholder
  }, p);

  var _usePropsValue = usePropsValue(Object.assign(Object.assign({}, props), {
    onChange: function onChange(val) {
      var _a;

      (_a = props.onConfirm) === null || _a === void 0 ? void 0 : _a.call(props, val, generateValueExtend(val));
    }
  })),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var generateValueExtend = useCascaderValueExtend(props.options);

  var _useState = useState(value),
      innerValue = _useState[0],
      setInnerValue = _useState[1];

  useEffect(function () {
    if (!props.visible) {
      setInnerValue(value);
    }
  }, [props.visible]);
  useEffect(function () {
    if (!props.visible) {
      setInnerValue(value);
    }
  }, [value]);
  var cascaderElement = withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classPrefix
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-header"
  }, /*#__PURE__*/React.createElement("a", {
    className: classPrefix + "-header-button",
    onClick: function onClick() {
      var _a, _b;

      (_a = props.onCancel) === null || _a === void 0 ? void 0 : _a.call(props);
      (_b = props.onClose) === null || _b === void 0 ? void 0 : _b.call(props);
    }
  }, props.cancelText), /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-header-title"
  }, props.title), /*#__PURE__*/React.createElement("a", {
    className: classPrefix + "-header-button",
    onClick: function onClick() {
      var _a;

      setValue(innerValue);
      (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
    }
  }, props.confirmText)), /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-body"
  }, /*#__PURE__*/React.createElement(CascaderView, Object.assign({}, props, {
    value: innerValue,
    onChange: function onChange(val, ext) {
      var _a;

      setInnerValue(val);

      if (props.visible) {
        (_a = props.onSelect) === null || _a === void 0 ? void 0 : _a.call(props, val, ext);
      }
    }
  })))));
  var popupElement = /*#__PURE__*/React.createElement(Popup, {
    visible: props.visible,
    position: 'bottom',
    onMaskClick: function onMaskClick() {
      var _a, _b;

      (_a = props.onCancel) === null || _a === void 0 ? void 0 : _a.call(props);
      (_b = props.onClose) === null || _b === void 0 ? void 0 : _b.call(props);
    },
    getContainer: props.getContainer,
    destroyOnClose: true,
    afterShow: props.afterShow,
    afterClose: props.afterClose,
    onClick: props.onClick,
    stopPropagation: props.stopPropagation
  }, cascaderElement);
  return /*#__PURE__*/React.createElement(React.Fragment, null, popupElement, (_a = props.children) === null || _a === void 0 ? void 0 : _a.call(props, generateValueExtend(value).items));
};