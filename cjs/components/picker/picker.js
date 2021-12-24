"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Picker = void 0;

var _react = _interopRequireWildcard(require("react"));

var _popup = _interopRequireDefault(require("../popup"));

var _withDefaultProps = require("../../utils/with-default-props");

var _nativeProps = require("../../utils/native-props");

var _usePropsValue2 = require("../../utils/use-props-value");

var _pickerView = _interopRequireDefault(require("../picker-view"));

var _useColumns = require("../picker-view/use-columns");

var _configProvider = require("../config-provider");

var _usePickerValueExtend = require("../picker-view/use-picker-value-extend");

var _ahooks = require("ahooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var classPrefix = "adm-picker";
var defaultProps = {
  defaultValue: []
};
var Picker = /*#__PURE__*/(0, _react.memo)(function (p) {
  var _a;

  var _useConfig = (0, _configProvider.useConfig)(),
      locale = _useConfig.locale;

  var props = (0, _withDefaultProps.mergeProps)(defaultProps, {
    confirmText: locale.common.confirm,
    cancelText: locale.common.cancel
  }, p);

  var _usePropsValue = (0, _usePropsValue2.usePropsValue)(Object.assign(Object.assign({}, props), {
    onChange: function onChange(val) {
      var _a;

      (_a = props.onConfirm) === null || _a === void 0 ? void 0 : _a.call(props, val, generateValueExtend(val));
    }
  })),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1]; // TODO: columns generated twice in Picker and PickerView, which can be improved


  var columns = (0, _useColumns.useColumns)(props.columns, value);
  var generateValueExtend = (0, _usePickerValueExtend.usePickerValueExtend)(columns);

  var _useState = (0, _react.useState)(value),
      innerValue = _useState[0],
      setInnerValue = _useState[1];

  (0, _react.useEffect)(function () {
    if (innerValue !== value) {
      setInnerValue(value);
    }
  }, [props.visible]);
  (0, _react.useEffect)(function () {
    if (!props.visible) {
      setInnerValue(value);
    }
  }, [value]);
  var onChange = (0, _ahooks.usePersistFn)(function (val, ext) {
    var _a;

    setInnerValue(val);

    if (props.visible) {
      (_a = props.onSelect) === null || _a === void 0 ? void 0 : _a.call(props, val, ext);
    }
  });
  var pickerElement = (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-header"
  }, /*#__PURE__*/_react["default"].createElement("a", {
    className: classPrefix + "-header-button",
    onClick: function onClick() {
      var _a, _b;

      (_a = props.onCancel) === null || _a === void 0 ? void 0 : _a.call(props);
      (_b = props.onClose) === null || _b === void 0 ? void 0 : _b.call(props);
    }
  }, props.cancelText), /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-header-title"
  }, props.title), /*#__PURE__*/_react["default"].createElement("a", {
    className: classPrefix + "-header-button",
    onClick: function onClick() {
      var _a;

      setValue(innerValue);
      (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
    }
  }, props.confirmText)), /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-body"
  }, /*#__PURE__*/_react["default"].createElement(_pickerView["default"], {
    columns: props.columns,
    value: innerValue,
    onChange: onChange
  }))));

  var popupElement = /*#__PURE__*/_react["default"].createElement(_popup["default"], {
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
  }, pickerElement);

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, popupElement, (_a = props.children) === null || _a === void 0 ? void 0 : _a.call(props, generateValueExtend(value).items));
});
exports.Picker = Picker;
Picker.displayName = 'Picker';