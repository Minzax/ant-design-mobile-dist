"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = void 0;

var _react = _interopRequireWildcard(require("react"));

var _usePropsValue = require("../../utils/use-props-value");

var _antdMobileIcons = require("antd-mobile-icons");

var _nativeProps = require("../../utils/native-props");

var _withDefaultProps = require("../../utils/with-default-props");

var _classnames = _interopRequireDefault(require("classnames"));

var _ahooks = require("ahooks");

var _bound = require("../../utils/bound");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const classPrefix = `adm-input`;
const defaultProps = {
  defaultValue: ''
};
const Input = (0, _react.forwardRef)((p, ref) => {
  const props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  const [value, setValue] = (0, _usePropsValue.usePropsValue)(props);
  const [hasFocus, setHasFocus] = (0, _react.useState)(false);
  const nativeInputRef = (0, _react.useRef)(null);
  (0, _react.useImperativeHandle)(ref, () => ({
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
    },

    get nativeElement() {
      return nativeInputRef.current;
    }

  }));

  const handleKeydown = e => {
    var _a;

    if (props.onEnterPress && (e.code === 'Enter' || e.keyCode === 13)) {
      props.onEnterPress(e);
    }

    (_a = props.onKeyDown) === null || _a === void 0 ? void 0 : _a.call(props, e);
  };

  (0, _ahooks.useIsomorphicLayoutEffect)(() => {
    var _a;

    if (!props.enterKeyHint) return;
    (_a = nativeInputRef.current) === null || _a === void 0 ? void 0 : _a.setAttribute('enterkeyhint', props.enterKeyHint);
    return () => {
      var _a;

      (_a = nativeInputRef.current) === null || _a === void 0 ? void 0 : _a.removeAttribute('enterkeyhint');
    };
  }, [props.enterKeyHint]);

  function checkValue() {
    let nextValue = value;

    if (props.type === 'number') {
      nextValue = nextValue && (0, _bound.bound)(parseFloat(nextValue), props.min, props.max).toString();
    }

    if (nextValue !== value) {
      setValue(nextValue);
    }
  }

  return (0, _nativeProps.withNativeProps)(props, _react.default.createElement("div", {
    className: (0, _classnames.default)(`${classPrefix}`, props.disabled && `${classPrefix}-disabled`)
  }, _react.default.createElement("input", {
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
      checkValue();
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
    autoFocus: props.autoFocus,
    pattern: props.pattern,
    inputMode: props.inputMode,
    type: props.type,
    autoCapitalize: props.autoCapitalize,
    autoCorrect: props.autoCorrect,
    onKeyDown: handleKeydown,
    onKeyUp: props.onKeyUp,
    onCompositionStart: props.onCompositionStart,
    onCompositionEnd: props.onCompositionEnd,
    onClick: props.onClick
  }), props.clearable && !!value && !props.readOnly && hasFocus && _react.default.createElement("div", {
    className: `${classPrefix}-clear`,
    onMouseDown: e => {
      e.preventDefault();
    },
    onClick: () => {
      var _a;

      setValue('');
      (_a = props.onClear) === null || _a === void 0 ? void 0 : _a.call(props);
    }
  }, _react.default.createElement(_antdMobileIcons.CloseCircleFill, null))));
});
exports.Input = Input;