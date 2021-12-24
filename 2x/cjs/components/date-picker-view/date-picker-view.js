"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatePickerView = void 0;

var _react = _interopRequireWildcard(require("react"));

var _pickerView = _interopRequireDefault(require("../picker-view"));

var _nativeProps = require("../../utils/native-props");

var _withDefaultProps = require("../../utils/with-default-props");

var _usePropsValue2 = require("../../utils/use-props-value");

var _datePickerUtils = require("../date-picker/date-picker-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var thisYear = new Date().getFullYear();
var defaultProps = {
  min: new Date(new Date().setFullYear(thisYear - 10)),
  max: new Date(new Date().setFullYear(thisYear + 10)),
  precision: 'day',
  renderLabel: _datePickerUtils.defaultRenderLabel
};

var DatePickerView = function DatePickerView(p) {
  var _a;

  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);

  var _usePropsValue = (0, _usePropsValue2.usePropsValue)({
    value: props.value,
    defaultValue: (_a = props.defaultValue) !== null && _a !== void 0 ? _a : null
  }),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var pickerValue = (0, _react.useMemo)(function () {
    return (0, _datePickerUtils.convertDateToStringArray)(value, props.precision);
  }, [value, props.precision]);
  var onChange = (0, _react.useCallback)(function (val) {
    var _a;

    var date = (0, _datePickerUtils.convertStringArrayToDate)(val, props.precision);

    if (date) {
      setValue(date);
      (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, date);
    }
  }, [props.onChange, props.precision]);
  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement(_pickerView["default"], {
    columns: function columns(selected) {
      return (0, _datePickerUtils.generateDatePickerColumns)(selected, props.min, props.max, props.precision, props.renderLabel, props.filter);
    },
    value: pickerValue,
    onChange: onChange
  }));
};

exports.DatePickerView = DatePickerView;