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

var _usePropsValue = require("../../utils/use-props-value");

var _datePickerUtils = require("./date-picker-utils");

var _bound = require("../../utils/bound");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const thisYear = new Date().getFullYear();
const defaultProps = {
  min: new Date(new Date().setFullYear(thisYear - 10)),
  max: new Date(new Date().setFullYear(thisYear + 10)),
  precision: 'day',
  renderLabel: _datePickerUtils.defaultRenderLabel,
  defaultValue: null
};

const DatePicker = p => {
  const props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  const [value, setValue] = (0, _usePropsValue.usePropsValue)({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: v => {
      var _a;

      if (v === null) return;
      (_a = props.onConfirm) === null || _a === void 0 ? void 0 : _a.call(props, v);
    }
  });
  const now = (0, _react.useMemo)(() => new Date(), []);
  const pickerValue = (0, _react.useMemo)(() => {
    let date = value !== null && value !== void 0 ? value : now;
    date = new Date((0, _bound.bound)(date.getTime(), props.min.getTime(), props.max.getTime()));
    return (0, _datePickerUtils.convertDateToStringArray)(date, props.precision);
  }, [value, props.precision, props.min, props.max]);
  const onConfirm = (0, _react.useCallback)(val => {
    setValue((0, _datePickerUtils.convertStringArrayToDate)(val, props.precision));
  }, [setValue, props.precision]);
  const onSelect = (0, _ahooks.useMemoizedFn)(val => {
    var _a;

    const date = (0, _datePickerUtils.convertStringArrayToDate)(val, props.precision);
    (_a = props.onSelect) === null || _a === void 0 ? void 0 : _a.call(props, date);
  });
  const columns = (0, _react.useCallback)(selected => (0, _datePickerUtils.generateDatePickerColumns)(selected, props.min, props.max, props.precision, props.renderLabel, props.filter), [props.min, props.max, props.precision, props.renderLabel]);
  return (0, _nativeProps.withNativeProps)(props, _react.default.createElement(_picker.default, {
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

exports.DatePicker = DatePicker;