import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { mergeProps } from '../../utils/with-default-props';
import { withNativeProps } from '../../utils/native-props';
import classNames from 'classnames';
import { bound } from '../../utils/bound';
import { usePropsValue } from '../../utils/use-props-value';
var classPrefix = 'adm-passcode-input';
var defaultProps = {
  defaultValue: '',
  length: 6,
  plain: false,
  error: false,
  seperated: false,
  caret: true
};
export var PasscodeInput = /*#__PURE__*/forwardRef(function (p, ref) {
  var props = mergeProps(defaultProps, p); // 防止 length 值不合法

  var cellLength = props.length > 0 && props.length < Infinity ? Math.floor(props.length) : defaultProps.length;

  var _useState = useState(false),
      focused = _useState[0],
      setFocused = _useState[1];

  var _usePropsValue = usePropsValue(props),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var rootRef = useRef(null);
  var nativeInputRef = useRef(null);
  useEffect(function () {
    var _a;

    if (value.length >= cellLength) {
      (_a = props.onFill) === null || _a === void 0 ? void 0 : _a.call(props, value);
    }
  }, [props.onFill, value, cellLength]);

  var onFocus = function onFocus() {
    var _a, _b;

    if (!props.keyboard) {
      (_a = nativeInputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }

    setFocused(true);
    (_b = props.onFocus) === null || _b === void 0 ? void 0 : _b.call(props);
  };

  useEffect(function () {
    if (!focused) return;
    var timeout = window.setTimeout(function () {
      var _a;

      (_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
        block: 'center',
        inline: 'center',
        behavior: 'smooth'
      });
    }, 100);
    return function () {
      window.clearTimeout(timeout);
    };
  }, [focused]);

  var onBlur = function onBlur() {
    var _a;

    setFocused(false);
    (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props);
  };

  useImperativeHandle(ref, function () {
    return {
      focus: function focus() {
        var _a;

        return (_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.focus();
      },
      blur: function blur() {
        var _a, _b;

        (_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.blur();
        (_b = nativeInputRef.current) === null || _b === void 0 ? void 0 : _b.blur();
      }
    };
  });

  var renderCells = function renderCells() {
    var cells = [];
    var chars = value.split('');
    var caretIndex = chars.length; // 光标位置index等于当前文字长度

    var focusedIndex = bound(chars.length, 0, cellLength - 1);

    for (var i = 0; i < cellLength; i++) {
      cells.push( /*#__PURE__*/React.createElement("div", {
        className: classNames(classPrefix + "-cell", {
          caret: props.caret && caretIndex === i && focused,
          focused: focusedIndex === i && focused,
          dot: !props.plain && chars[i]
        }),
        key: i
      }, chars[i] && props.plain ? chars[i] : ''));
    }

    return cells;
  };

  var cls = classNames(classPrefix, {
    focused: focused,
    error: props.error,
    seperated: props.seperated
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    ref: rootRef,
    tabIndex: 0,
    className: cls,
    onFocus: onFocus,
    onBlur: onBlur
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-cell-container"
  }, renderCells()), /*#__PURE__*/React.createElement("input", {
    ref: nativeInputRef,
    className: classPrefix + "-native-input",
    value: value,
    type: 'text',
    pattern: '[0-9]*',
    inputMode: 'numeric',
    onChange: function onChange(e) {
      setValue(e.target.value.slice(0, props.length));
    }
  }))), props.keyboard && /*#__PURE__*/React.cloneElement(props.keyboard, {
    visible: focused,
    onInput: function onInput(v) {
      if (value.length < cellLength) {
        setValue((value + v).slice(0, props.length));
      }
    },
    onDelete: function onDelete() {
      setValue(value.slice(0, -1));
    },
    onClose: function onClose() {
      var _a;

      (_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.blur();
    }
  }));
});