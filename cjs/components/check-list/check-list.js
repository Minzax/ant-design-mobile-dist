"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckList = void 0;

var _react = _interopRequireDefault(require("react"));

var _nativeProps = require("../../utils/native-props");

var _list = _interopRequireDefault(require("../list"));

var _withDefaultProps = require("../../utils/with-default-props");

var _context = require("./context");

var _usePropsValue2 = require("../../utils/use-props-value");

var _antdMobileIcons = require("antd-mobile-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var defaultProps = {
  multiple: false,
  defaultValue: [],
  activeIcon: /*#__PURE__*/_react["default"].createElement(_antdMobileIcons.CheckOutline, null)
};

var CheckList = function CheckList(p) {
  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);

  var _usePropsValue = (0, _usePropsValue2.usePropsValue)(props),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  function check(val) {
    if (props.multiple) {
      setValue([].concat(value, [val]));
    } else {
      setValue([val]);
    }
  }

  function uncheck(val) {
    setValue(value.filter(function (item) {
      return item !== val;
    }));
  }

  var activeIcon = props.activeIcon,
      disabled = props.disabled,
      readOnly = props.readOnly;
  return /*#__PURE__*/_react["default"].createElement(_context.CheckListContext.Provider, {
    value: {
      value: value,
      check: check,
      uncheck: uncheck,
      activeIcon: activeIcon,
      disabled: disabled,
      readOnly: readOnly
    }
  }, (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement(_list["default"], {
    mode: props.mode
  }, props.children)));
};

exports.CheckList = CheckList;