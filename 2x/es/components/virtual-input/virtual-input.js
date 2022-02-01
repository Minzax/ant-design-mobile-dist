import React, { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { withNativeProps } from '../../utils/native-props';
import { mergeProps } from '../../utils/with-default-props';
import { usePropsValue } from '../../utils/use-props-value';
import classNames from 'classnames';
import { CloseCircleFill } from 'antd-mobile-icons';
const classPrefix = 'adm-virtual-input';
const defaultProps = {
  defaultValue: ''
};
export const VirtualInput = forwardRef((p, ref) => {
  const props = mergeProps(defaultProps, p);
  const [value, setValue] = usePropsValue(props);
  const rootRef = useRef(null);
  const contentRef = useRef(null);
  const [hasFocus, setHasFocus] = useState(false);

  function scrollToEnd() {
    const root = rootRef.current;
    if (!root) return;

    if (document.activeElement !== root) {
      return;
    }

    const content = contentRef.current;
    if (!content) return;
    content.scrollLeft = content.clientWidth;
  }

  useLayoutEffect(() => {
    scrollToEnd();
  }, [value]);
  useEffect(() => {
    if (hasFocus) {
      scrollToEnd();
    }
  }, [hasFocus]);
  useImperativeHandle(ref, () => ({
    focus: () => {
      var _a;

      (_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    },
    blur: () => {
      var _a;

      (_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.blur();
    }
  }));

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

  return withNativeProps(props, React.createElement("div", {
    ref: rootRef,
    className: classNames(classPrefix, {
      [`${classPrefix}-disabled`]: props.disabled
    }),
    tabIndex: props.disabled ? undefined : 0,
    onFocus: onFocus,
    onBlur: onBlur,
    onClick: props.onClick
  }, React.createElement("div", {
    className: `${classPrefix}-content`,
    ref: contentRef
  }, value, React.createElement("div", {
    className: `${classPrefix}-caret-container`
  }, hasFocus && React.createElement("div", {
    className: `${classPrefix}-caret`
  }))), props.clearable && !!value && hasFocus && React.createElement("div", {
    className: `${classPrefix}-clear`,
    onClick: e => {
      var _a;

      e.stopPropagation();
      setValue('');
      (_a = props.onClear) === null || _a === void 0 ? void 0 : _a.call(props);
    }
  }, React.createElement(CloseCircleFill, null)), !value && React.createElement("div", {
    className: `${classPrefix}-placeholder`
  }, props.placeholder), props.keyboard && React.cloneElement(props.keyboard, {
    onInput: v => {
      setValue(value + v);
    },
    onDelete: () => {
      setValue(value.slice(0, -1));
    },
    visible: hasFocus,
    onClose: () => {
      var _a;

      (_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.blur();
    }
  })));
});