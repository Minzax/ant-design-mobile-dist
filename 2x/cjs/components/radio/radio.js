"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Radio = void 0;

var _react = _interopRequireWildcard(require("react"));

var _nativeProps = require("../../utils/native-props");

var _classnames = _interopRequireDefault(require("classnames"));

var _groupContext = require("./group-context");

var _usePropsValue2 = require("../../utils/use-props-value");

var _withDefaultProps = require("../../utils/with-default-props");

var _checkIcon = require("../checkbox/check-icon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var classPrefix = "adm-radio";
var defaultProps = {
  defaultChecked: false
};

var Radio = function Radio(p) {
  var _classNames;

  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  var groupContext = (0, _react.useContext)(_groupContext.RadioGroupContext);

  var _usePropsValue = (0, _usePropsValue2.usePropsValue)({
    value: props.checked,
    defaultValue: props.defaultChecked,
    onChange: props.onChange
  }),
      checked = _usePropsValue[0],
      setChecked = _usePropsValue[1];

  var disabled = props.disabled;
  var value = props.value;

  if (groupContext && value !== undefined) {
    checked = groupContext.value.includes(value);

    setChecked = function setChecked(checked) {
      var _a;

      if (checked) {
        groupContext.check(value);
      } else {
        groupContext.uncheck(value);
      }

      (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, checked);
    };

    disabled = disabled || groupContext.disabled;
  }

  var renderIcon = function renderIcon() {
    if (props.icon) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: classPrefix + "-custom-icon"
      }, props.icon(checked));
    }

    return /*#__PURE__*/_react["default"].createElement("div", {
      className: classPrefix + "-icon"
    }, checked && /*#__PURE__*/_react["default"].createElement(_checkIcon.CheckIcon, {
      className: classPrefix + "-icon-checked"
    }));
  };

  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("label", {
    className: (0, _classnames["default"])(classPrefix, props.className, (_classNames = {}, _classNames[classPrefix + "-checked"] = checked, _classNames[classPrefix + "-disabled"] = disabled, _classNames[classPrefix + "-block"] = props.block, _classNames)),
    style: props.style
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: 'radio',
    checked: checked,
    onChange: function onChange(e) {
      setChecked(e.target.checked);
    },
    onClick: function onClick(e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    },
    disabled: disabled,
    id: props.id
  }), renderIcon(), props.children && /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-content"
  }, props.children)));
};

exports.Radio = Radio;