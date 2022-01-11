"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickerView = void 0;

var _react = _interopRequireWildcard(require("react"));

var _withDefaultProps = require("../../utils/with-default-props");

var _wheel = require("./wheel");

var _useColumns = require("./use-columns");

var _nativeProps = require("../../utils/native-props");

var _usePickerValueExtend = require("./use-picker-value-extend");

var _ahooks = require("ahooks");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var classPrefix = "adm-picker-view";
var defaultProps = {
  defaultValue: []
};
var PickerView = /*#__PURE__*/(0, _react.memo)(function (p) {
  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);

  var _useState = (0, _react.useState)(props.value === undefined ? props.defaultValue : props.value),
      innerValue = _useState[0],
      setInnerValue = _useState[1];

  (0, _ahooks.useDebounceEffect)(function () {
    var _a;

    if (props.value === innerValue) return;
    (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, innerValue, generateValueExtend(innerValue));
  }, [innerValue], {
    wait: 0,
    leading: false,
    trailing: true
  }); // Sync `value` to `innerValue`

  (0, _react.useEffect)(function () {
    if (props.value === undefined) return; // Uncontrolled mode

    if (props.value === innerValue) return;
    setInnerValue(props.value);
  }, [props.value]);
  (0, _react.useEffect)(function () {
    if (props.value === innerValue) return;
    var timeout = window.setTimeout(function () {
      if (props.value !== undefined && props.value !== innerValue) {
        setInnerValue(props.value);
      }
    }, 1000);
    return function () {
      window.clearTimeout(timeout);
    };
  }, [props.value, innerValue]);
  var columns = (0, _useColumns.useColumns)(props.columns, innerValue);
  var generateValueExtend = (0, _usePickerValueExtend.usePickerValueExtend)(columns);
  var handleSelect = (0, _react.useCallback)(function (val, index) {
    setInnerValue(function (prev) {
      var next = [].concat(prev);
      next[index] = val;
      return next;
    });
  }, []);
  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: "" + classPrefix
  }, columns.map(function (column, index) {
    return /*#__PURE__*/_react["default"].createElement(_wheel.Wheel, {
      key: index,
      index: index,
      column: column,
      value: innerValue[index],
      onSelect: handleSelect
    });
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-mask"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-mask-top"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-mask-middle"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-mask-bottom"
  }))));
});
exports.PickerView = PickerView;
PickerView.displayName = 'PickerView';