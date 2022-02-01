import React, { useState, forwardRef, useImperativeHandle, useRef, useLayoutEffect } from 'react';
import { usePropsValue } from '../../utils/use-props-value';
import { CloseCircleFill } from 'antd-mobile-icons';
import { withNativeProps } from '../../utils/native-props';
import { mergeProps } from '../../utils/with-default-props';
import classNames from 'classnames';
const classPrefix = `adm-input`;
const defaultProps = {
  defaultValue: ''
};
export const Input = forwardRef((p, ref) => {
  const props = mergeProps(defaultProps, p);
  const [value, setValue] = usePropsValue(props);
  const [hasFocus, setHasFocus] = useState(false);
  const nativeInputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    clear: () => {
      setValue('');
    },
    focus: () => {
      var _a;

      (_a = nativeInputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    },
    blur: () => {
      var _a;

      (_a = nativeInputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
    }
  }));

  const handleKeydown = e => {
    var _a;

    if (props.onEnterPress && (e.code === 'Enter' || e.keyCode === 13)) {
      props.onEnterPress(e);
    }

    (_a = props.onKeyDown) === null || _a === void 0 ? void 0 : _a.call(props, e);
  };

  useLayoutEffect(() => {
    var _a;

    if (!props.enterKeyHint) return;
    (_a = nativeInputRef.current) === null || _a === void 0 ? void 0 : _a.setAttribute('enterkeyhint', props.enterKeyHint);
    return () => {
      var _a;

      (_a = nativeInputRef.current) === null || _a === void 0 ? void 0 : _a.removeAttribute('enterkeyhint');
    };
  }, [props.enterKeyHint]);
  return withNativeProps(props, React.createElement("div", {
    className: classNames(`${classPrefix}`, props.disabled && `${classPrefix}-disabled`)
  }, React.createElement("input", {
    ref: nativeInputRef,
    className: `${classPrefix}-element`,
    value: value,
    onChange: e => {
      setValue(e.target.value);
    },
    onFocus: e => {
      var _a;

      setHasFocus(true);
      (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, e);
    },
    onBlur: e => {
      var _a;

      setHasFocus(false);
      (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, e);
    },
    id: props.id,
    onClick: props.onClick,
    placeholder: props.placeholder,
    disabled: props.disabled,
    readOnly: props.readOnly,
    maxLength: props.maxLength,
    minLength: props.minLength,
    max: props.max,
    min: props.min,
    autoComplete: props.autoComplete,
    pattern: props.pattern,
    inputMode: props.inputMode,
    type: props.type,
    autoCapitalize: props.autoCapitalize,
    autoCorrect: props.autoCorrect,
    onKeyDown: handleKeydown,
    onKeyUp: props.onKeyUp,
    onCompositionStart: props.onCompositionStart,
    onCompositionEnd: props.onCompositionEnd
  }), props.clearable && !!value && React.createElement("div", {
    className: `${classPrefix}-clear`,
    onMouseDown: e => {
      e.preventDefault();
    },
    onClick: () => {
      var _a;

      setValue('');
      (_a = props.onClear) === null || _a === void 0 ? void 0 : _a.call(props);
    }
  }, React.createElement(CloseCircleFill, null))));
});