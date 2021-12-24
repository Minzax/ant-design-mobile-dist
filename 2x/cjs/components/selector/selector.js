"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Selector = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _nativeProps = require("../../utils/native-props");

var _withDefaultProps = require("../../utils/with-default-props");

var _space = _interopRequireDefault(require("../space"));

var _grid = _interopRequireDefault(require("../grid"));

var _convertPx = require("../../utils/convert-px");

var _selectorCheckMark = _interopRequireDefault(require("../../assets/selector-check-mark.svg"));

var _usePropsValue2 = require("../../utils/use-props-value");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classPrefix = "adm-selector";
var defaultProps = {
  multiple: false,
  defaultValue: []
};

var Selector = function Selector(p) {
  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);

  var _usePropsValue = (0, _usePropsValue2.usePropsValue)({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: function onChange(val) {
      var _a;

      var extend = {
        get items() {
          return props.options.filter(function (option) {
            return val.includes(option.value);
          });
        }

      };
      (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, val, extend);
    }
  }),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var items = props.options.map(function (option) {
    var _classNames;

    var active = (value || []).includes(option.value);
    var disabled = option.disabled || props.disabled;
    var itemCls = (0, _classnames["default"])(classPrefix + "-item", (_classNames = {}, _classNames[classPrefix + "-item-active"] = active && !props.multiple, _classNames[classPrefix + "-item-multiple-active"] = active && props.multiple, _classNames[classPrefix + "-item-disabled"] = disabled, _classNames));
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: option.value,
      className: itemCls,
      onClick: function onClick() {
        if (disabled) {
          return;
        }

        if (props.multiple) {
          var val = active ? value.filter(function (v) {
            return v !== option.value;
          }) : [].concat(value, [option.value]);
          setValue(val);
        } else {
          var _val = active ? [] : [option.value];

          setValue(_val);
        }
      }
    }, option.label, active && props.multiple && /*#__PURE__*/_react["default"].createElement("div", {
      className: classPrefix + "-check-mark-wrapper"
    }, /*#__PURE__*/_react["default"].createElement("img", {
      src: _selectorCheckMark["default"]
    })));
  });
  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix
  }, !props.columns && /*#__PURE__*/_react["default"].createElement(_space["default"], {
    wrap: true
  }, items), props.columns && /*#__PURE__*/_react["default"].createElement(_grid["default"], {
    columns: props.columns,
    gap: (0, _convertPx.convertPx)(8)
  }, items)));
};

exports.Selector = Selector;