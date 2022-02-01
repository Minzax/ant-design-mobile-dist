import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { MinusOutline, AddOutline } from 'antd-mobile-icons';
import { withNativeProps } from '../../utils/native-props';
import { usePropsValue } from '../../utils/use-props-value';
import { mergeProps } from '../../utils/with-default-props';
import { bound } from '../../utils/bound';
import Input from '../input';
import Button from '../button';
const classPrefix = `adm-stepper`;
const defaultProps = {
  defaultValue: 0,
  step: 1,
  disabled: false
};
export const Stepper = p => {
  const props = mergeProps(defaultProps, p);
  const {
    disabled,
    step,
    max,
    min,
    inputReadOnly
  } = props;
  const [value, setValue] = usePropsValue(props);
  const [inputValue, setInputValue] = useState(() => value.toString());

  function setValueWithCheck(v) {
    if (isNaN(v)) return;
    let target = bound(v, props.min, props.max);

    if (props.digits || props.digits === 0) {
      target = parseFloat(target.toFixed(props.digits));
    }

    setValue(target);
  }

  const [hasFocus, setHasFocus] = useState(false);
  useEffect(() => {
    if (!hasFocus) {
      setInputValue(value.toString());
    }
  }, [hasFocus]);
  useEffect(() => {
    if (!hasFocus) {
      setInputValue(value.toString());
    }
  }, [value]);

  const handleInputChange = v => {
    setInputValue(v);
    setValueWithCheck(parseFloat(v));
  };

  const handleMinus = () => {
    setValueWithCheck(value - step);
  };

  const handlePlus = () => {
    setValueWithCheck(value + step);
  };

  const minusDisabled = () => {
    if (min === undefined) {
      return disabled;
    } else {
      return disabled || value <= min;
    }
  };

  const plusDisabled = () => {
    if (max === undefined) {
      return disabled;
    } else {
      return disabled || value >= max;
    }
  };

  return withNativeProps(props, React.createElement("div", {
    className: classNames(classPrefix, {
      [`${classPrefix}-active`]: hasFocus
    })
  }, React.createElement(Button, {
    className: `${classPrefix}-minus`,
    onClick: handleMinus,
    disabled: minusDisabled(),
    fill: 'none',
    shape: 'rectangular',
    color: 'primary'
  }, React.createElement(MinusOutline, null)), React.createElement("div", {
    className: `${classPrefix}-middle`
  }, React.createElement(Input, {
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
  })), React.createElement(Button, {
    className: `${classPrefix}-plus`,
    onClick: handlePlus,
    disabled: plusDisabled(),
    fill: 'none',
    shape: 'rectangular',
    color: 'primary'
  }, React.createElement(AddOutline, null))));
};