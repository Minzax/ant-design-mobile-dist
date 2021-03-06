import React, { useCallback, useMemo } from 'react';
import { useMemoizedFn } from 'ahooks';
import Picker from '../picker';
import { withNativeProps } from '../../utils/native-props';
import { mergeProps } from '../../utils/with-default-props';
import { usePropsValue } from '../../utils/use-props-value';
import { convertDateToStringArray, convertStringArrayToDate, generateDatePickerColumns, defaultRenderLabel } from './date-picker-utils';
import { bound } from '../../utils/bound';
const thisYear = new Date().getFullYear();
const defaultProps = {
  min: new Date(new Date().setFullYear(thisYear - 10)),
  max: new Date(new Date().setFullYear(thisYear + 10)),
  precision: 'day',
  renderLabel: defaultRenderLabel,
  defaultValue: null
};
export const DatePicker = p => {
  const props = mergeProps(defaultProps, p);
  const [value, setValue] = usePropsValue({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: v => {
      var _a;

      if (v === null) return;
      (_a = props.onConfirm) === null || _a === void 0 ? void 0 : _a.call(props, v);
    }
  });
  const now = useMemo(() => new Date(), []);
  const pickerValue = useMemo(() => {
    let date = value !== null && value !== void 0 ? value : now;
    date = new Date(bound(date.getTime(), props.min.getTime(), props.max.getTime()));
    return convertDateToStringArray(date, props.precision);
  }, [value, props.precision, props.min, props.max]);
  const onConfirm = useCallback(val => {
    setValue(convertStringArrayToDate(val, props.precision));
  }, [setValue, props.precision]);
  const onSelect = useMemoizedFn(val => {
    var _a;

    const date = convertStringArrayToDate(val, props.precision);
    (_a = props.onSelect) === null || _a === void 0 ? void 0 : _a.call(props, date);
  });
  const columns = useCallback(selected => generateDatePickerColumns(selected, props.min, props.max, props.precision, props.renderLabel, props.filter), [props.min, props.max, props.precision, props.renderLabel]);
  return withNativeProps(props, React.createElement(Picker, {
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
    stopPropagation: props.stopPropagation,
    mouseWheel: props.mouseWheel
  }, () => {
    var _a;

    return (_a = props.children) === null || _a === void 0 ? void 0 : _a.call(props, value);
  }));
};