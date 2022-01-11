import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { MinusOutline, AddOutline } from 'antd-mobile-icons';
import { withNativeProps } from '../../utils/native-props';
import { usePropsValue } from '../../utils/use-props-value';
import { mergeProps } from '../../utils/with-default-props';
import { bound } from '../../utils/bound';
import Input from '../input';
import Button from '../button';
var classPrefix = "adm-stepper";
var defaultProps = {
  defaultValue: 0,
  step: 1,
  disabled: false
};
export var Stepper = function Stepper(p) {
  var _classNames;

  var props = mergeProps(defaultProps, p);
  var disabled = props.disabled,
      step = props.step,
      max = props.max,
      min = props.min,
      inputReadOnly = props.inputReadOnly;

  var _usePropsValue = usePropsValue(props),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var _useState = useState(function () {
    return value.toString();
  }),
      inputValue = _useState[0],
      setInputValue = _useState[1];

  function setValueWithCheck(v) {
    if (isNaN(v)) return;
    var target = bound(v, props.min, props.max);

    if (props.digits || props.digits === 0) {
      target = parseFloat(target.toFixed(props.digits));
    }

    setValue(target);
  }

  var _useState2 = useState(false),
      hasFocus = _useState2[0],
      setHasFocus = _useState2[1];

  useEffect(function () {
    if (!hasFocus) {
      setInputValue(value.toString());
    }
  }, [hasFocus]);
  useEffect(function () {
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

  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classNames(classPrefix, (_classNames = {}, _classNames[classPrefix + "-disabled"] = disabled, _classNames[classPrefix + "-active"] = hasFocus, _classNames))
  }, /*#__PURE__*/React.createElement(Button, {
    className: classPrefix + "-minus",
    onClick: handleMinus,
    disabled: minusDisabled(),
    fill: 'none',
    color: 'primary'
  }, /*#__PURE__*/React.createElement(MinusOutline, null)), /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-middle"
  }, /*#__PURE__*/React.createElement(Input, {
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
  })), /*#__PURE__*/React.createElement(Button, {
    className: classPrefix + "-plus",
    onClick: handlePlus,
    disabled: plusDisabled(),
    fill: 'none',
    color: 'primary'
  }, /*#__PURE__*/React.createElement(AddOutline, null))));
};