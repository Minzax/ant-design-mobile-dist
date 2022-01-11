"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stepper = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _antdMobileIcons = require("antd-mobile-icons");

var _nativeProps = require("../../utils/native-props");

var _usePropsValue2 = require("../../utils/use-props-value");

var _withDefaultProps = require("../../utils/with-default-props");

var _bound = require("../../utils/bound");

var _input = _interopRequireDefault(require("../input"));

var _button = _interopRequireDefault(require("../button"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classPrefix = "adm-stepper";
var defaultProps = {
  defaultValue: 0,
  step: 1,
  disabled: false
};

var Stepper = function Stepper(p) {
  var _classNames;

  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  var disabled = props.disabled,
      step = props.step,
      max = props.max,
      min = props.min,
      inputReadOnly = props.inputReadOnly;

  var _usePropsValue = (0, _usePropsValue2.usePropsValue)(props),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var _useState = (0, _react.useState)(function () {
    return value.toString();
  }),
      inputValue = _useState[0],
      setInputValue = _useState[1];

  function setValueWithCheck(v) {
    if (isNaN(v)) return;
    var target = (0, _bound.bound)(v, props.min, props.max);

    if (props.digits || props.digits === 0) {
      target = parseFloat(target.toFixed(props.digits));
    }

    setValue(target);
  }

  var _useState2 = (0, _react.useState)(false),
      hasFocus = _useState2[0],
      setHasFocus = _useState2[1];

  (0, _react.useEffect)(function () {
    if (!hasFocus) {
      setInputValue(value.toString());
    }
  }, [hasFocus]);
  (0, _react.useEffect)(function () {
    if (!hasFocus) {
      setInputValue(value.toString());
    }
  }, [value]);

  var handleInputChange = function handleInputChange(v) {
    setInputValue(v);
    setValueWithCheck(parseFloat(v));
  };

  var handleMinus = function handleMinus() {
    setValueWithCheck(value - step);
  };

  var handlePlus = function handlePlus() {
    setValueWithCheck(value + step);
  };

  var minusDisabled = function minusDisabled() {
    if (min === undefined) {
      return disabled;
    } else {
      return disabled || value <= min;
    }
  };

  var plusDisabled = function plusDisabled() {
    if (max === undefined) {
      return disabled;
    } else {
      return disabled || value >= max;
    }
  };

  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(classPrefix, (_classNames = {}, _classNames[classPrefix + "-disabled"] = disabled, _classNames[classPrefix + "-active"] = hasFocus, _classNames))
  }, /*#__PURE__*/_react["default"].createElement(_button["default"], {
    className: classPrefix + "-minus",
    onClick: handleMinus,
    disabled: minusDisabled(),
    fill: 'none',
    color: 'primary'
  }, /*#__PURE__*/_react["default"].createElement(_antdMobileIcons.MinusOutline, null)), /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-middle"
  }, /*#__PURE__*/_react["default"].createElement(_input["default"], {
    className: classPrefix + "-input",
    onFocus: function onFocus(e) {
      var _a;

      setHasFocus(true);
      (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, e);
    },
    value: inputValue,
    onChange: function onChange(val) {
      disabled || handleInputChange(val);
    },
    disabled: disabled,
    onBlur: function onBlur(e) {
      var _a;

      setHasFocus(false);
      (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, e);
    },
    readOnly: inputReadOnly
  })), /*#__PURE__*/_react["default"].createElement(_button["default"], {
    className: classPrefix + "-plus",
    onClick: handlePlus,
    disabled: plusDisabled(),
    fill: 'none',
    color: 'primary'
  }, /*#__PURE__*/_react["default"].createElement(_antdMobileIcons.AddOutline, null))));
};

exports.Stepper = Stepper;