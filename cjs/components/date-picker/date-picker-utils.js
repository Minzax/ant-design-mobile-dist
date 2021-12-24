"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateDatePickerColumns = exports.defaultRenderLabel = exports.convertStringArrayToDate = exports.convertDateToStringArray = void 0;

var dateUtils = _interopRequireWildcard(require("./date-picker-date-utils"));

var weekUtils = _interopRequireWildcard(require("./date-picker-week-utils"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var convertDateToStringArray = function convertDateToStringArray(date, precision) {
  if (precision.includes('week')) {
    return weekUtils.convertDateToStringArray(date);
  } else {
    return dateUtils.convertDateToStringArray(date);
  }
};

exports.convertDateToStringArray = convertDateToStringArray;

var convertStringArrayToDate = function convertStringArrayToDate(value, precision) {
  if (precision.includes('week')) {
    return weekUtils.convertStringArrayToDate(value);
  } else {
    return dateUtils.convertStringArrayToDate(value);
  }
};

exports.convertStringArrayToDate = convertStringArrayToDate;

var generateDatePickerColumns = function generateDatePickerColumns(selected, min, max, precision, renderLabel, filter) {
  if (precision.startsWith('week')) {
    return weekUtils.generateDatePickerColumns(selected, min, max, precision, renderLabel, filter);
  } else {
    return dateUtils.generateDatePickerColumns(selected, min, max, precision, renderLabel, filter);
  }
};

exports.generateDatePickerColumns = generateDatePickerColumns;

var defaultRenderLabel = function defaultRenderLabel(precision, data) {
  if (precision.includes('week')) {
    return weekUtils.defaultRenderLabel(precision, data);
  } else {
    return dateUtils.defaultRenderLabel(precision, data);
  }
};

exports.defaultRenderLabel = defaultRenderLabel;