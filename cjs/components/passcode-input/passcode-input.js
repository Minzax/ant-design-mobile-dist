"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasscodeInput = void 0;

var _react = _interopRequireWildcard(require("react"));

var _withDefaultProps = require("../../utils/with-default-props");

var _nativeProps = require("../../utils/native-props");

var _classnames = _interopRequireDefault(require("classnames"));

var _bound = require("../../utils/bound");

var _usePropsValue2 = require("../../utils/use-props-value");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var classPrefix = 'adm-passcode-input';
var defaultProps = {
  defaultValue: '',
  length: 6,
  plain: false,
  error: false,
  seperated: false,
  caret: true
};
var PasscodeInput = /*#__PURE__*/(0, _react.forwardRef)(function (p, ref) {
  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p); // 防止 length 值不合法

  var cellLength = props.length > 0 && props.length < Infinity ? Math.floor(props.length) : defaultProps.length;

  var _useState = (0, _react.useState)(false),
      focused = _useState[0],
      setFocused = _useState[1];

  var _usePropsValue = (0, _usePropsValue2.usePropsValue)(props),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var rootRef = (0, _react.useRef)(null);
  var nativeInputRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
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

  (0, _react.useEffect)(function () {
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

  (0, _react.useImperativeHandle)(ref, function () {
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

    var focusedIndex = (0, _bound.bound)(chars.length, 0, cellLength - 1);

    for (var i = 0; i < cellLength; i++) {
      cells.push( /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(classPrefix + "-cell", {
          caret: props.caret && caretIndex === i && focused,
          focused: focusedIndex === i && focused,
          dot: !props.plain && chars[i]
        }),
        key: i
      }, chars[i] && props.plain ? chars[i] : ''));
    }

    return cells;
  };

  var cls = (0, _classnames["default"])(classPrefix, {
    focused: focused,
    error: props.error,
    seperated: props.seperated
  });
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    ref: rootRef,
    tabIndex: 0,
    className: cls,
    onFocus: onFocus,
    onBlur: onBlur
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-cell-container"
  }, renderCells()), /*#__PURE__*/_react["default"].createElement("input", {
    ref: nativeInputRef,
    className: classPrefix + "-native-input",
    value: value,
    type: 'text',
    pattern: '[0-9]*',
    inputMode: 'numeric',
    onChange: function onChange(e) {
      setValue(e.target.value.slice(0, props.length));
    }
  }))), props.keyboard && /*#__PURE__*/_react["default"].cloneElement(props.keyboard, {
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
exports.PasscodeInput = PasscodeInput;