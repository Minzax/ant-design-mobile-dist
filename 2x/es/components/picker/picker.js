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
const classPrefix = `adm-picker`;
const defaultProps = {
  defaultValue: []
};
export const Picker = memo(p => {
  var _a;

  const {
    locale
  } = useConfig();
  const props = mergeProps(defaultProps, {
    confirmText: locale.common.confirm,
    cancelText: locale.common.cancel
  }, p);
  const [value, setValue] = usePropsValue(Object.assign(Object.assign({}, props), {
    onChange: val => {
      var _a;

      (_a = props.onConfirm) === null || _a === void 0 ? void 0 : _a.call(props, val, generateValueExtend(val));
    }
  })); // TODO: columns generated twice in Picker and PickerView, which can be improved

  const columns = useColumns(props.columns, value);
  const generateValueExtend = usePickerValueExtend(columns);
  const [innerValue, setInnerValue] = useState(value);
  useEffect(() => {
    if (innerValue !== value) {
      setInnerValue(value);
    }
  }, [props.visible]);
  useEffect(() => {
    if (!props.visible) {
      setInnerValue(value);
    }
  }, [value]);
  const onChange = useMemoizedFn((val, ext) => {
    var _a;

    setInnerValue(val);

    if (props.visible) {
      (_a = props.onSelect) === null || _a === void 0 ? void 0 : _a.call(props, val, ext);
    }
  });
  const pickerElement = withNativeProps(props, React.createElement("div", {
    className: classPrefix
  }, React.createElement("div", {
    className: `${classPrefix}-header`
  }, React.createElement("a", {
    className: `${classPrefix}-header-button`,
    onClick: () => {
      var _a, _b;

      (_a = props.onCancel) === null || _a === void 0 ? void 0 : _a.call(props);
      (_b = props.onClose) === null || _b === void 0 ? void 0 : _b.call(props);
    }
  }, props.cancelText), React.createElement("div", {
    className: `${classPrefix}-header-title`
  }, props.title), React.createElement("a", {
    className: `${classPrefix}-header-button`,
    onClick: () => {
      var _a;

      setValue(innerValue);
      (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
    }
  }, props.confirmText)), React.createElement("div", {
    className: `${classPrefix}-body`
  }, React.createElement(PickerView, {
    columns: props.columns,
    value: innerValue,
    onChange: onChange
  }))));
  const popupElement = React.createElement(Popup, {
    className: `${classPrefix}-popup`,
    visible: props.visible,
    position: 'bottom',
    onMaskClick: () => {
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
  }, pickerElement, React.createElement(SafeArea, {
    position: 'bottom'
  }));
  return React.createElement(React.Fragment, null, popupElement, (_a = props.children) === null || _a === void 0 ? void 0 : _a.call(props, generateValueExtend(value).items));
});
Picker.displayName = 'Picker';