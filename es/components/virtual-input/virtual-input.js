import React, { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { withNativeProps } from '../../utils/native-props';
import { mergeProps } from '../../utils/with-default-props';
import { usePropsValue } from '../../utils/use-props-value';
import classNames from 'classnames';
import { CloseCircleFill } from 'antd-mobile-icons';
var classPrefix = 'adm-virtual-input';
var defaultProps = {
  defaultValue: ''
};
export var VirtualInput = /*#__PURE__*/forwardRef(function (p, ref) {
  var _classNames;

  var props = mergeProps(defaultProps, p);

  var _usePropsValue = usePropsValue(props),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var rootRef = useRef(null);
  var contentRef = useRef(null);

  var _useState = useState(false),
      hasFocus = _useState[0],
      setHasFocus = _useState[1];

  function scrollToEnd() {
    var root = rootRef.current;
    if (!root) return;

    if (document.activeElement !== root) {
      return;
    }

    var content = contentRef.current;
    if (!content) return;
    content.scrollLeft = content.clientWidth;
  }

  useLayoutEffect(function () {
    scrollToEnd();
  }, [value]);
  useEffect(function () {
    if (hasFocus) {
      scrollToEnd();
    }
  }, [hasFocus]);
  useImperativeHandle(ref, function () {
    return {
      focus: function focus() {
        var _a;

        (_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.focus();
      },
      blur: function blur() {
        var _a;

        (_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.blur();
      }
    };
  });

  function onFocus() {
    var _a;

    setHasFocus(true);
    (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props);
  }

  function onBlur() {
    var _a;

    setHasFocus(false);
    (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props);
  }

  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    ref: rootRef,
    className: classNames(classPrefix, (_classNames = {}, _classNames[classPrefix + "-disabled"] = props.disabled, _classNames)),
    tabIndex: props.disabled ? undefined : 0,
    onFocus: onFocus,
    onBlur: onBlur,
    onClick: props.onClick
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-content",
    ref: contentRef
  }, value, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-caret-container"
  }, hasFocus && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-caret"
  }))), props.clearable && !!value && hasFocus && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-clear",
    onClick: function onClick(e) {
      var _a;

      e.stopPropagation();
      setValue('');
      (_a = props.onClear) === null || _a === void 0 ? void 0 : _a.call(props);
    }
  }, /*#__PURE__*/React.createElement(CloseCircleFill, null)), !value && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-placeholder"
  }, props.placeholder), props.keyboard && /*#__PURE__*/React.cloneElement(props.keyboard, {
    onInput: function onInput(v) {
      setValue(value + v);
    },
    onDelete: function onDelete() {
      setValue(value.slice(0, -1));
    },
    visible: hasFocus,
    onClose: function onClose() {
      var _a;

      (_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.blur();
    }
  })));
});