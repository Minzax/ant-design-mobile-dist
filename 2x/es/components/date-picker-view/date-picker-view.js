import React, { useCallback, useMemo } from 'react';
import PickerView from '../picker-view';
import { withNativeProps } from '../../utils/native-props';
import { mergeProps } from '../../utils/with-default-props';
import { usePropsValue } from '../../utils/use-props-value';
import { generateDatePickerColumns, convertDateToStringArray, convertStringArrayToDate, defaultRenderLabel } from '../date-picker/date-picker-utils';
var thisYear = new Date().getFullYear();
var defaultProps = {
  min: new Date(new Date().setFullYear(thisYear - 10)),
  max: new Date(new Date().setFullYear(thisYear + 10)),
  precision: 'day',
  renderLabel: defaultRenderLabel
};
export var DatePickerView = function DatePickerView(p) {
  var _a;

  var props = mergeProps(defaultProps, p);

  var _usePropsValue = usePropsValue({
    value: props.value,
    defaultValue: (_a = props.defaultValue) !== null && _a !== void 0 ? _a : null
  }),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var pickerValue = useMemo(function () {
    return convertDateToStringArray(value, props.precision);
  }, [value, props.precision]);
  var onChange = useCallback(function (val) {
    var _a;

    var date = convertStringArrayToDate(val, props.precision);

    if (date) {
      setValue(date);
      (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, date);
    }
  }, [props.onChange, props.precision]);
  return withNativeProps(props, /*#__PURE__*/React.createElement(PickerView, {
    columns: function columns(selected) {
      return generateDatePickerColumns(selected, props.min, props.max, props.precision, props.renderLabel, props.filter);
    },
    value: pickerValue,
    onChange: onChange
  }));
};