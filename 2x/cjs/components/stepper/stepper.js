"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stepper = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _antdMobileIcons = require("antd-mobile-icons");

var _nativeProps = require("../../utils/native-props");

var _usePropsValue = require("../../utils/use-props-value");

var _withDefaultProps = require("../../utils/with-default-props");

var _bound = require("../../utils/bound");

var _input = _interopRequireDefault(require("../input"));

var _button = _interopRequireDefault(require("../button"));

var _big = _interopRequireDefault(require("big.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const classPrefix = `adm-stepper`;
const defaultProps = {
  defaultValue: 0,
  step: 1,
  disabled: false,
  allowEmpty: false
};

const Stepper = p => {
  const props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  const {
    disabled,
    step,
    max,
    min,
    inputReadOnly
  } = props;
  const [value, setValue] = (0, _usePropsValue.usePropsValue)(props);
  const [inputValue, setInputValue] = (0, _react.useState)(() => convertValueToText(value, props.digits));

  function setValueWithCheck(v) {
    if (isNaN(v)) return;
    let target = (0, _bound.bound)(v, props.min, props.max);

    if (props.digits !== undefined) {
      target = parseFloat(target.toFixed(props.digits));
    }

    setValue(target);
  }

  const [hasFocus, setHasFocus] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    if (!hasFocus) {
      setInputValue(convertValueToText(value, props.digits));
    }
  }, [hasFocus]);
  (0, _react.useEffect)(() => {
    if (!hasFocus) {
      setInputValue(convertValueToText(value, props.digits));
    }
  }, [value, props.digits]);

  const handleInputChange = v => {
    setInputValue(v);
    const value = convertTextToValue(v);

    if (value === null) {
      if (props.allowEmpty) {
        setValue(null);
      } else {
        setValue(props.defaultValue);
      }
    } else {
      setValueWithCheck(value);
    }
  };

  const handleMinus = () => {
    setValueWithCheck((0, _big.default)(value !== null && value !== void 0 ? value : 0).minus(step).toNumber());
  };

  const handlePlus = () => {
    setValueWithCheck((0, _big.default)(value !== null && value !== void 0 ? value : 0).add(step).toNumber());
  };

  const minusDisabled = () => {
    if (disabled) return true;
    if (value === null) return false;

    if (min !== undefined) {
      return value <= min;
    }

    return false;
  };

  const plusDisabled = () => {
    if (disabled) return true;
    if (value === null) return false;

    if (max !== undefined) {
      return value >= max;
    }

    return false;
  };

  return (0, _nativeProps.withNativeProps)(props, _react.default.createElement("div", {
    className: (0, _classnames.default)(classPrefix, {
      [`${classPrefix}-active`]: hasFocus
    })
  }, _react.default.createElement(_button.default, {
    className: `${classPrefix}-minus`,
    onClick: handleMinus,
    disabled: minusDisabled(),
    fill: 'none',
    shape: 'rectangular',
    color: 'primary'
  }, _react.default.createElement(_antdMobileIcons.MinusOutline, null)), _react.default.createElement("div", {
    className: `${classPrefix}-middle`
  }, _react.default.createElement(_input.default, {
    className: `${classPrefix}-input`,
    onFocus: e => {
      var _a;

      setHasFocus(true);
      (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, e);
    },
    value: inputValue,
    onChange: val => {
      disabled || handleInputChange(val);
    },
    disabled: disabled,
    onBlur: e => {
      var _a;

      setHasFocus(false);
      (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, e);
    },
    readOnly: inputReadOnly
  })), _react.default.createElement(_button.default, {
    className: `${classPrefix}-plus`,
    onClick: handlePlus,
    disabled: plusDisabled(),
    fill: 'none',
    shape: 'rectangular',
    color: 'primary'
  }, _react.default.createElement(_antdMobileIcons.AddOutline, null))));
};

exports.Stepper = Stepper;

function convertValueToText(value, digits) {
  if (value === null) return '';

  if (digits !== undefined) {
    return value.toFixed(digits);
  } else {
    return value.toString();
  }
}

function convertTextToValue(text) {
  if (text === '') return null;
  return parseFloat(text);
}