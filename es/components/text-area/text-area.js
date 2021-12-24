var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import { usePropsValue } from '../../utils/use-props-value';
import { mergeProps } from '../../utils/with-default-props';
var classPrefix = 'adm-text-area';
var defaultProps = {
  rows: 2,
  showCount: false,
  autoSize: false,
  defaultValue: ''
};
export var TextArea = /*#__PURE__*/forwardRef(function (p, ref) {
  var props = mergeProps(defaultProps, p);

  var className = props.className,
      style = props.style,
      outerDefaultValue = props.defaultValue,
      outerValue = props.value,
      outerOnChange = props.onChange,
      rows = props.rows,
      autoSize = props.autoSize,
      showCount = props.showCount,
      textAreaProps = __rest(props, ["className", "style", "defaultValue", "value", "onChange", "rows", "autoSize", "showCount"]);

  var _usePropsValue = usePropsValue(props),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var nativeTextAreaRef = useRef(null);
  useImperativeHandle(ref, function () {
    return {
      clear: function clear() {
        setValue('');
      },
      focus: function focus() {
        var _a;

        (_a = nativeTextAreaRef.current) === null || _a === void 0 ? void 0 : _a.focus();
      },
      blur: function blur() {
        var _a;

        (_a = nativeTextAreaRef.current) === null || _a === void 0 ? void 0 : _a.blur();
      }
    };
  });
  useEffect(function () {
    if (!autoSize) return;
    var textArea = nativeTextAreaRef.current;
    if (!textArea) return;
    textArea.style.height = 'auto';
    var height = textArea.scrollHeight;

    if (typeof autoSize === 'object') {
      var computedStyle = window.getComputedStyle(textArea);
      var lineHeight = parseFloat(computedStyle.lineHeight);

      if (autoSize.minRows) {
        height = Math.max(height, autoSize.minRows * lineHeight);
      }

      if (autoSize.maxRows) {
        height = Math.min(height, autoSize.maxRows * lineHeight);
      }
    }

    textArea.style.height = height + "px";
  }, [value, autoSize]);
  var count;

  if (typeof showCount === 'function') {
    count = showCount(value.length, props.maxLength);
  } else if (showCount) {
    count = /*#__PURE__*/React.createElement("div", {
      className: classPrefix + "-count"
    }, props.maxLength === undefined ? value.length : value.length + '/' + props.maxLength);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: classNames(classPrefix + "-wrapper", className),
    style: style
  }, /*#__PURE__*/React.createElement("textarea", Object.assign({
    ref: nativeTextAreaRef
  }, textAreaProps, {
    className: classPrefix,
    rows: rows,
    value: value,
    onChange: function onChange(e) {
      setValue(e.target.value);
    },
    onFocus: function onFocus(e) {
      var _a;

      (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, e);
    },
    onBlur: function onBlur(e) {
      var _a;

      (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, e);
    },
    id: props.id
  })), count);
});
TextArea.defaultProps = defaultProps;