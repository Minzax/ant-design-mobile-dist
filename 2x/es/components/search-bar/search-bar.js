import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import classNames from 'classnames';
import Input from '../input';
import Button from '../button';
import { withNativeProps } from '../../utils/native-props';
import { mergeProps } from '../../utils/with-default-props';
import { SearchOutline } from 'antd-mobile-icons';
import { usePropsValue } from '../../utils/use-props-value';
import { useConfig } from '../config-provider';
var classPrefix = "adm-search-bar";
var defaultProps = {
  clearable: true,
  showCancelButton: false,
  defaultValue: '',
  clearOnCancel: true,
  icon: /*#__PURE__*/React.createElement(SearchOutline, null)
};
export var SearchBar = /*#__PURE__*/forwardRef(function (p, ref) {
  var _classNames, _classNames2;

  var _useConfig = useConfig(),
      locale = _useConfig.locale;

  var props = mergeProps(defaultProps, {
    cancelText: locale.common.cancel
  }, p);

  var _usePropsValue = usePropsValue(props),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var _useState = useState(false),
      hasFocus = _useState[0],
      setHasFocus = _useState[1];

  var inputRef = useRef(null);
  useImperativeHandle(ref, function () {
    return {
      clear: function clear() {
        var _a;

        return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.clear();
      },
      focus: function focus() {
        var _a;

        return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
      },
      blur: function blur() {
        var _a;

        return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
      }
    };
  });

  var renderCancelButton = function renderCancelButton() {
    var isShowCancel = false;

    if (typeof props.showCancelButton === 'function') {
      isShowCancel = props.showCancelButton(hasFocus, value);
    } else {
      isShowCancel = props.showCancelButton && hasFocus;
    }

    return isShowCancel && /*#__PURE__*/React.createElement("div", {
      className: classPrefix + "-suffix",
      onMouseDown: function onMouseDown(e) {
        e.preventDefault();
      },
      onTouchStart: function onTouchStart(e) {
        e.preventDefault();
      }
    }, /*#__PURE__*/React.createElement(Button, {
      fill: 'none',
      className: classPrefix + "-cancel-button",
      onClick: function onClick() {
        var _a, _b, _c;

        if (props.clearOnCancel) {
          (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.clear();
        }

        (_b = inputRef.current) === null || _b === void 0 ? void 0 : _b.blur();
        (_c = props.onCancel) === null || _c === void 0 ? void 0 : _c.call(props);
      }
    }, props.cancelText));
  };

  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classNames(classPrefix, (_classNames = {}, _classNames[classPrefix + "-active"] = hasFocus, _classNames))
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-input-box"
  }, props.icon && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-input-box-icon"
  }, props.icon), /*#__PURE__*/React.createElement(Input, {
    ref: inputRef,
    className: classNames(classPrefix + "-input", (_classNames2 = {}, _classNames2[classPrefix + "-input-without-icon"] = !props.icon, _classNames2)),
    value: value,
    onChange: setValue,
    maxLength: props.maxLength,
    placeholder: props.placeholder,
    clearable: props.clearable,
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
    onClear: props.onClear,
    type: 'search',
    enterKeyHint: 'search',
    onEnterPress: function onEnterPress() {
      var _a, _b;

      (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
      (_b = props.onSearch) === null || _b === void 0 ? void 0 : _b.call(props, value);
    }
  })), renderCancelButton()));
});