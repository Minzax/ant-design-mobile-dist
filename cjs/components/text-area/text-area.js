"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextArea = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _usePropsValue2 = require("../../utils/use-props-value");

var _withDefaultProps = require("../../utils/with-default-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var classPrefix = 'adm-text-area';
var defaultProps = {
  rows: 2,
  showCount: false,
  autoSize: false,
  defaultValue: ''
};
var TextArea = /*#__PURE__*/(0, _react.forwardRef)(function (p, ref) {
  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);

  var className = props.className,
      style = props.style,
      outerDefaultValue = props.defaultValue,
      outerValue = props.value,
      outerOnChange = props.onChange,
      rows = props.rows,
      autoSize = props.autoSize,
      showCount = props.showCount,
      textAreaProps = __rest(props, ["className", "style", "defaultValue", "value", "onChange", "rows", "autoSize", "showCount"]);

  var _usePropsValue = (0, _usePropsValue2.usePropsValue)(props),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var nativeTextAreaRef = (0, _react.useRef)(null);
  (0, _react.useImperativeHandle)(ref, function () {
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
  (0, _react.useEffect)(function () {
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
    count = /*#__PURE__*/_react["default"].createElement("div", {
      className: classPrefix + "-count"
    }, props.maxLength === undefined ? value.length : value.length + '/' + props.maxLength);
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(classPrefix + "-wrapper", className),
    style: style
  }, /*#__PURE__*/_react["default"].createElement("textarea", Object.assign({
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
exports.TextArea = TextArea;
TextArea.defaultProps = defaultProps;