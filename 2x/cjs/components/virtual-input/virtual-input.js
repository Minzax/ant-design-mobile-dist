"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VirtualInput = void 0;

var _react = _interopRequireWildcard(require("react"));

var _nativeProps = require("../../utils/native-props");

var _withDefaultProps = require("../../utils/with-default-props");

var _usePropsValue2 = require("../../utils/use-props-value");

var _classnames = _interopRequireDefault(require("classnames"));

var _antdMobileIcons = require("antd-mobile-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var classPrefix = 'adm-virtual-input';
var defaultProps = {
  defaultValue: ''
};
var VirtualInput = /*#__PURE__*/(0, _react.forwardRef)(function (p, ref) {
  var _classNames;

  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);

  var _usePropsValue = (0, _usePropsValue2.usePropsValue)(props),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var rootRef = (0, _react.useRef)(null);
  var contentRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(false),
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

  (0, _react.useLayoutEffect)(function () {
    scrollToEnd();
  }, [value]);
  (0, _react.useEffect)(function () {
    if (hasFocus) {
      scrollToEnd();
    }
  }, [hasFocus]);
  (0, _react.useImperativeHandle)(ref, function () {
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

  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    ref: rootRef,
    className: (0, _classnames["default"])(classPrefix, (_classNames = {}, _classNames[classPrefix + "-disabled"] = props.disabled, _classNames)),
    tabIndex: props.disabled ? undefined : 0,
    onFocus: onFocus,
    onBlur: onBlur,
    onClick: props.onClick
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-content",
    ref: contentRef
  }, value, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-caret-container"
  }, hasFocus && /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-caret"
  }))), props.clearable && !!value && hasFocus && /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-clear",
    onClick: function onClick(e) {
      var _a;

      e.stopPropagation();
      setValue('');
      (_a = props.onClear) === null || _a === void 0 ? void 0 : _a.call(props);
    }
  }, /*#__PURE__*/_react["default"].createElement(_antdMobileIcons.CloseCircleFill, null)), !value && /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-placeholder"
  }, props.placeholder), props.keyboard && /*#__PURE__*/_react["default"].cloneElement(props.keyboard, {
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
exports.VirtualInput = VirtualInput;