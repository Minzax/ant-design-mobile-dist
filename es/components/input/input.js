import React, { useState, forwardRef, useImperativeHandle, useRef, useLayoutEffect } from 'react';
import { usePropsValue } from '../../utils/use-props-value';
import { CloseCircleFill } from 'antd-mobile-icons';
import { withNativeProps } from '../../utils/native-props';
import { mergeProps } from '../../utils/with-default-props';
var classPrefix = "adm-input";
var defaultProps = {
  defaultValue: ''
};
export var Input = /*#__PURE__*/forwardRef(function (p, ref) {
  var props = mergeProps(defaultProps, p);

  var _usePropsValue = usePropsValue(props),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var _useState = useState(false),
      hasFocus = _useState[0],
      setHasFocus = _useState[1];

  var nativeInputRef = useRef(null);
  useImperativeHandle(ref, function () {
    return {
      clear: function clear() {
        setValue('');
      },
      focus: function focus() {
        var _a;

        (_a = nativeInputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
      },
      blur: function blur() {
        var _a;

        (_a = nativeInputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
      }
    };
  });

  var handleKeydown = function handleKeydown(e) {
    var _a;

    if (props.onEnterPress && (e.code === 'Enter' || e.keyCode === 13)) {
      props.onEnterPress(e);
    }

    (_a = props.onKeyDown) === null || _a === void 0 ? void 0 : _a.call(props, e);
  };

  useLayoutEffect(function () {
    var _a;

    if (!props.enterKeyHint) return;
    (_a = nativeInputRef.current) === null || _a === void 0 ? void 0 : _a.setAttribute('enterkeyhint', props.enterKeyHint);
    return function () {
      var _a;

      (_a = nativeInputRef.current) === null || _a === void 0 ? void 0 : _a.removeAttribute('enterkeyhint');
    };
  }, [props.enterKeyHint]);
  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-wrapper"
  }, /*#__PURE__*/React.createElement("input", {
    ref: nativeInputRef,
    className: classPrefix,
    value: value,
    onChange: function onChange(e) {
      setValue(e.target.value);
    },
    onFocus: function onFocus(e) {
      var _a;

      setHasFocus(true);
      (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, e);
    },
    onBlur: function onBlur(e) {
      var _a;

      setHasFocus(false);
      (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, e);
    },
    id: props.id,
    placeholder: props.placeholder,
    disabled: props.disabled,
    readOnly: props.readOnly,
    maxLength: props.maxLength,
    minLength: props.minLength,
    max: props.max,
    min: props.min,
    autoComplete: props.autoComplete,
    pattern: props.pattern,
    type: props.type,
    autoCapitalize: props.autoCapitalize,
    autoCorrect: props.autoCorrect,
    onKeyDown: handleKeydown,
    onKeyUp: props.onKeyUp
  }), props.clearable && !!value && hasFocus && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-clear",
    onMouseDown: function onMouseDown(e) {
      e.preventDefault();
    },
    onClick: function onClick() {
      var _a;

      setValue('');
      (_a = props.onClear) === null || _a === void 0 ? void 0 : _a.call(props);
    }
  }, /*#__PURE__*/React.createElement(CloseCircleFill, null))));
});