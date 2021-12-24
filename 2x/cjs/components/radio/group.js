"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Group = void 0;

var _react = _interopRequireDefault(require("react"));

var _withDefaultProps = require("../../utils/with-default-props");

var _groupContext = require("./group-context");

var _usePropsValue2 = require("../../utils/use-props-value");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var defaultProps = {
  disabled: false,
  defaultValue: null
};

var Group = function Group(p) {
  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);

  var _usePropsValue = (0, _usePropsValue2.usePropsValue)(props),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  return /*#__PURE__*/_react["default"].createElement(_groupContext.RadioGroupContext.Provider // TODO: 性能优化
  , {
    // TODO: 性能优化
    value: {
      value: value === null ? [] : [value],
      check: function check(v) {
        setValue(v);
      },
      uncheck: function uncheck() {},
      disabled: props.disabled
    }
  }, props.children);
};

exports.Group = Group;