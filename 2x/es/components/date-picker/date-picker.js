import React, { useCallback, useMemo } from 'react';
import { useMemoizedFn } from 'ahooks';
import Picker from '../picker';
import { withNativeProps } from '../../utils/native-props';
import { mergeProps } from '../../utils/with-default-props';
import { usePropsValue } from '../../utils/use-props-value';
import { convertDateToStringArray, convertStringArrayToDate, generateDatePickerColumns, defaultRenderLabel } from './date-picker-utils';
var thisYear = new Date().getFullYear();
var defaultProps = {
  min: new Date(new Date().setFullYear(thisYear - 10)),
  max: new Date(new Date().setFullYear(thisYear + 10)),
  precision: 'day',
  renderLabel: defaultRenderLabel
};
export var DatePicker = function DatePicker(p) {
  var _a;

  var props = mergeProps(defaultProps, p);

  var _usePropsValue = usePropsValue({
    value: props.value,
    defaultValue: (_a = props.defaultValue) !== null && _a !== void 0 ? _a : null,
    onChange: props.onConfirm
  }),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var pickerValue = useMemo(function () {
    return convertDateToStringArray(value, props.precision);
  }, [value, props.precision]);
  var onConfirm = useCallback(function (val) {
    setValue(convertStringArrayToDate(val, props.precision));
  }, [setValue, props.precision]);
  var onSelect = useMemoizedFn(function (val) {
    var _a;

    var date = convertStringArrayToDate(val, props.precision);
    (_a = props.onSelect) === null || _a === void 0 ? void 0 : _a.call(props, date);
  });
  var columns = useCallback(function (selected) {
    return generateDatePickerColumns(selected, props.min, props.max, props.precision, props.renderLabel, props.filter);
  }, [props.min, props.max, props.precision, props.renderLabel]);
  return withNativeProps(props, /*#__PURE__*/React.createElement(Picker, {
    columns: columns,
    value: pickerValue,
    onCancel: props.onCancel,
    onClose: props.onClose,
    visible: props.visible,
    confirmText: props.confirmText,
    cancelText: props.cancelText,
    onConfirm: onConfirm,
    onSelect: onSelect,
    getContainer: props.getContainer,
    afterShow: props.afterShow,
    afterClose: props.afterClose,
    onClick: props.onClick,
    title: props.title,
    stopPropagation: props.stopPropagation
  }, function (items) {
    var _a;

    return (_a = props.children) === null || _a === void 0 ? void 0 : _a.call(props, items.length === 0 ? null : convertStringArrayToDate(items.map(function (item) {
      return item === null || item === void 0 ? void 0 : item.value;
    }), props.precision));
  }));
};