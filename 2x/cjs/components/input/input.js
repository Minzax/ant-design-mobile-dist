"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = void 0;

var _react = _interopRequireWildcard(require("react"));

var _usePropsValue2 = require("../../utils/use-props-value");

var _antdMobileIcons = require("antd-mobile-icons");

var _nativeProps = require("../../utils/native-props");

var _withDefaultProps = require("../../utils/with-default-props");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var classPrefix = "adm-input";
var defaultProps = {
  defaultValue: ''
};
var Input = /*#__PURE__*/(0, _react.forwardRef)(function (p, ref) {
  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);

  var _usePropsValue = (0, _usePropsValue2.usePropsValue)(props),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var _useState = (0, _react.useState)(false),
      hasFocus = _useState[0],
      setHasFocus = _useState[1];

  var nativeInputRef = (0, _react.useRef)(null);
  (0, _react.useImperativeHandle)(ref, function () {
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

  (0, _react.useLayoutEffect)(function () {
    var _a;

    if (!props.enterKeyHint) return;
    (_a = nativeInputRef.current) === null || _a === void 0 ? void 0 : _a.setAttribute('enterkeyhint', props.enterKeyHint);
    return function () {
      var _a;

      (_a = nativeInputRef.current) === null || _a === void 0 ? void 0 : _a.removeAttribute('enterkeyhint');
    };
  }, [props.enterKeyHint]);
  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-wrapper"
  }, /*#__PURE__*/_react["default"].createElement("input", {
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
  }), props.clearable && !!value && hasFocus && /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-clear",
    onMouseDown: function onMouseDown(e) {
      e.preventDefault();
    },
    onClick: function onClick() {
      var _a;

      setValue('');
      (_a = props.onClear) === null || _a === void 0 ? void 0 : _a.call(props);
    }
  }, /*#__PURE__*/_react["default"].createElement(_antdMobileIcons.CloseCircleFill, null))));
});
exports.Input = Input;