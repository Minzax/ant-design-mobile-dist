"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeProps = mergeProps;

var _assign = _interopRequireDefault(require("lodash/assign"));

var _assignWith = _interopRequireDefault(require("lodash/assignWith"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function mergeProps() {
  function customizer(objValue, srcValue) {
    return (0, _isUndefined["default"])(srcValue) ? objValue : srcValue;
  }

  var ret = (0, _assign["default"])({}, arguments.length <= 0 ? undefined : arguments[0]);

  for (var i = 1; i < arguments.length; i++) {
    ret = (0, _assignWith["default"])(ret, i < 0 || arguments.length <= i ? undefined : arguments[i], customizer);
  }

  return ret;
}