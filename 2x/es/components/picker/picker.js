import React, { useState, useEffect, memo } from 'react';
import Popup from '../popup';
import { mergeProps } from '../../utils/with-default-props';
import { withNativeProps } from '../../utils/native-props';
import { usePropsValue } from '../../utils/use-props-value';
import PickerView from '../picker-view';
import { useColumns } from '../picker-view/use-columns';
import { useConfig } from '../config-provider';
import { usePickerValueExtend } from '../picker-view/use-picker-value-extend';
import { useMemoizedFn } from 'ahooks';
import SafeArea from '../safe-area';
var classPrefix = "adm-picker";
var defaultProps = {
  defaultValue: []
};
export var Picker = /*#__PURE__*/memo(function (p) {
  var _a;

  var _useConfig = useConfig(),
      locale = _useConfig.locale;

  var props = mergeProps(defaultProps, {
    confirmText: locale.common.confirm,
    cancelText: locale.common.cancel
  }, p);

  var _usePropsValue = usePropsValue(Object.assign(Object.assign({}, props), {
    onChange: function onChange(val) {
      var _a;

      (_a = props.onConfirm) === null || _a === void 0 ? void 0 : _a.call(props, val, generateValueExtend(val));
    }
  })),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1]; // TODO: columns generated twice in Picker and PickerView, which can be improved


  var columns = useColumns(props.columns, value);
  var generateValueExtend = usePickerValueExtend(columns);

  var _useState = useState(value),
      innerValue = _useState[0],
      setInnerValue = _useState[1];

  useEffect(function () {
    if (innerValue !== value) {
      setInnerValue(value);
    }
  }, [props.visible]);
  useEffect(function () {
    if (!props.visible) {
      setInnerValue(value);
    }
  }, [value]);
  var onChange = useMemoizedFn(function (val, ext) {
    var _a;

    setInnerValue(val);

    if (props.visible) {
      (_a = props.onSelect) === null || _a === void 0 ? void 0 : _a.call(props, val, ext);
    }
  });
  var pickerElement = withNativeProps(props, /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement(PickerView, {
    columns: props.columns,
    value: innerValue,
    onChange: onChange
  }))));
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
    forceRender: true,
    stopPropagation: props.stopPropagation
  }, pickerElement, /*#__PURE__*/React.createElement(SafeArea, {
    position: 'bottom'
  }));
  return /*#__PURE__*/React.createElement(React.Fragment, null, popupElement, (_a = props.children) === null || _a === void 0 ? void 0 : _a.call(props, generateValueExtend(value).items));
});
Picker.displayName = 'Picker';