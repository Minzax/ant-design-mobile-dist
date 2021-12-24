import * as dateUtils from './date-picker-date-utils';
import * as weekUtils from './date-picker-week-utils';
export var convertDateToStringArray = function convertDateToStringArray(date, precision) {
  if (precision.includes('week')) {
    return weekUtils.convertDateToStringArray(date);
  } else {
    return dateUtils.convertDateToStringArray(date);
  }
};
export var convertStringArrayToDate = function convertStringArrayToDate(value, precision) {
  if (precision.includes('week')) {
    return weekUtils.convertStringArrayToDate(value);
  } else {
    return dateUtils.convertStringArrayToDate(value);
  }
};
export var generateDatePickerColumns = function generateDatePickerColumns(selected, min, max, precision, renderLabel, filter) {
  if (precision.startsWith('week')) {
    return weekUtils.generateDatePickerColumns(selected, min, max, precision, renderLabel, filter);
  } else {
    return dateUtils.generateDatePickerColumns(selected, min, max, precision, renderLabel, filter);
  }
};
export var defaultRenderLabel = function defaultRenderLabel(precision, data) {
  if (precision.includes('week')) {
    return weekUtils.defaultRenderLabel(precision, data);
  } else {
    return dateUtils.defaultRenderLabel(precision, data);
  }
};