"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextArea = void 0;

var _react = _interopRequireWildcard(require("react"));

var _nativeProps = require("../../utils/native-props");

var _usePropsValue = require("../../utils/use-props-value");

var _withDefaultProps = require("../../utils/with-default-props");

var _devLog = require("../../utils/dev-log");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const classPrefix = 'adm-text-area';
const defaultProps = {
  rows: 2,
  showCount: false,
  autoSize: false,
  defaultValue: ''
};
const TextArea = (0, _react.forwardRef)((p, ref) => {
  const props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  const {
    autoSize,
    showCount,
    maxLength
  } = props;
  const [value, setValue] = (0, _usePropsValue.usePropsValue)(Object.assign(Object.assign({}, props), {
    value: props.value === null ? '' : props.value
  }));

  if (props.value === null) {
    (0, _devLog.devError)('TextArea', '`value` prop on `TextArea` should not be `null`. Consider using an empty string to clear the component.');
  }

  const nativeTextAreaRef = (0, _react.useRef)(null);
  (0, _react.useImperativeHandle)(ref, () => ({
    clear: () => {
      setValue('');
    },
    focus: () => {
      var _a;

      (_a = nativeTextAreaRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    },
    blur: () => {
      var _a;

      (_a = nativeTextAreaRef.current) === null || _a === void 0 ? void 0 : _a.blur();
    }
  }));
  (0, _react.useEffect)(() => {
    if (!autoSize) return;
    const textArea = nativeTextAreaRef.current;
    if (!textArea) return;
    textArea.style.height = 'auto';
    let height = textArea.scrollHeight;

    if (typeof autoSize === 'object') {
      const computedStyle = window.getComputedStyle(textArea);
      const lineHeight = parseFloat(computedStyle.lineHeight);

      if (autoSize.minRows) {
        height = Math.max(height, autoSize.minRows * lineHeight);
      }

      if (autoSize.maxRows) {
        height = Math.min(height, autoSize.maxRows * lineHeight);
      }
    }

    textArea.style.height = `${height}px`;
  }, [value, autoSize]);
  const compositingRef = (0, _react.useRef)(false);
  let count;
  const valueLength = [...value].length;

  if (typeof showCount === 'function') {
    count = showCount(valueLength, maxLength);
  } else if (showCount) {
    count = _react.default.createElement("div", {
      className: `${classPrefix}-count`
    }, maxLength === undefined ? valueLength : valueLength + '/' + maxLength);
  }

  return (0, _nativeProps.withNativeProps)(props, _react.default.createElement("div", {
    className: classPrefix
  }, _react.default.createElement("textarea", {
    ref: nativeTextAreaRef,
    className: `${classPrefix}-element`,
    rows: props.rows,
    value: value,
    placeholder: props.placeholder,
    onChange: e => {
      let v = e.target.value;

      if (maxLength && !compositingRef.current) {
        v = [...v].slice(0, maxLength).join('');
      }

      setValue(v);
    },
    id: props.id,
    onCompositionStart: e => {
      var _a;

      compositingRef.current = true;
      (_a = props.onCompositionStart) === null || _a === void 0 ? void 0 : _a.call(props, e);
    },
    onCompositionEnd: e => {
      var _a;

      compositingRef.current = false;

      if (maxLength) {
        setValue([...value].slice(0, maxLength).join(''));
      }

      (_a = props.onCompositionEnd) === null || _a === void 0 ? void 0 : _a.call(props, e);
    },
    autoComplete: props.autoComplete,
    autoFocus: props.autoFocus,
    disabled: props.disabled,
    readOnly: props.readOnly,
    onFocus: props.onFocus,
    onBlur: props.onBlur,
    onClick: props.onClick
  }), count));
});
exports.TextArea = TextArea;
TextArea.defaultProps = defaultProps;