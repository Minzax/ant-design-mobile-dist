"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatePicker = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ahooks = require("ahooks");

var _picker = _interopRequireDefault(require("../picker"));

var _nativeProps = require("../../utils/native-props");

var _withDefaultProps = require("../../utils/with-default-props");

var _usePropsValue2 = require("../../utils/use-props-value");

var _datePickerUtils = require("./date-picker-utils");

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

var DatePicker = function DatePicker(p) {
  var _a;

  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);

  var _usePropsValue = (0, _usePropsValue2.usePropsValue)({
    value: props.value,
    defaultValue: (_a = props.defaultValue) !== null && _a !== void 0 ? _a : null,
    onChange: props.onConfirm
  }),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var pickerValue = (0, _react.useMemo)(function () {
    return (0, _datePickerUtils.convertDateToStringArray)(value, props.precision);
  }, [value, props.precision]);
  var onConfirm = (0, _react.useCallback)(function (val) {
    setValue((0, _datePickerUtils.convertStringArrayToDate)(val, props.precision));
  }, [setValue, props.precision]);
  var onSelect = (0, _ahooks.usePersistFn)(function (val) {
    var _a;

    var date = (0, _datePickerUtils.convertStringArrayToDate)(val, props.precision);
    (_a = props.onSelect) === null || _a === void 0 ? void 0 : _a.call(props, date);
  });
  var columns = (0, _react.useCallback)(function (selected) {
    return (0, _datePickerUtils.generateDatePickerColumns)(selected, props.min, props.max, props.precision, props.renderLabel, props.filter);
  }, [props.min, props.max, props.precision, props.renderLabel]);
  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement(_picker["default"], {
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

    return (_a = props.children) === null || _a === void 0 ? void 0 : _a.call(props, items.length === 0 ? null : (0, _datePickerUtils.convertStringArrayToDate)(items.map(function (item) {
      return item === null || item === void 0 ? void 0 : item.value;
    }), props.precision));
  }));
};

exports.DatePicker = DatePicker;