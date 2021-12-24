"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rate = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _nativeProps = require("../../utils/native-props");

var _withDefaultProps = require("../../utils/with-default-props");

var _antdMobileIcons = require("antd-mobile-icons");

var _usePropsValue2 = require("../../utils/use-props-value");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classPrefix = "adm-rate";
var defaultProps = {
  count: 5,
  allowHalf: false,
  character: /*#__PURE__*/_react["default"].createElement(_antdMobileIcons.StarFill, null),
  defaultValue: 0,
  readOnly: false,
  allowClear: true
};

var Rate = function Rate(p) {
  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);

  var _usePropsValue = (0, _usePropsValue2.usePropsValue)(props),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var starList = Array(props.count).fill(null);

  function renderStar(v, half) {
    var _classNames;

    return /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames["default"])(classPrefix + "-star", (_classNames = {}, _classNames[classPrefix + "-star-active"] = value >= v, _classNames[classPrefix + "-star-half"] = half, _classNames[classPrefix + "-star-readonly"] = props.readOnly, _classNames)),
      onClick: function onClick() {
        if (props.readOnly) return;

        if (props.allowClear && value === v) {
          setValue(0);
        } else {
          setValue(v);
        }
      }
    }, props.character);
  }

  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix
  }, starList.map(function (_, i) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: i,
      className: (0, _classnames["default"])(classPrefix + "-box")
    }, props.allowHalf && renderStar(i + 0.5, true), renderStar(i + 1, false));
  })));
};

exports.Rate = Rate;