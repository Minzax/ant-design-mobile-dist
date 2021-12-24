"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Steps = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _withDefaultProps = require("../../utils/with-default-props");

var _nativeProps = require("../../utils/native-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classPrefix = "adm-steps";
var stepClassPrefix = "adm-step";

var defaultIcon = /*#__PURE__*/_react["default"].createElement("span", {
  className: stepClassPrefix + "-icon-dot"
});

var defaultProps = {
  current: 0,
  direction: 'horizontal'
};

var Steps = function Steps(p) {
  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  var direction = props.direction,
      current = props.current;
  var classString = (0, _classnames["default"])(classPrefix, classPrefix + "-" + direction);
  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: classString
  }, _react["default"].Children.map(props.children, function (child, index) {
    var _a;

    if (! /*#__PURE__*/_react["default"].isValidElement(child)) {
      return child;
    }

    var props = child.props;
    var status = props.status || 'wait';

    if (index < current) {
      status = props.status || 'finish';
    } else if (index === current) {
      status = props.status || 'process';
    }

    var icon = (_a = props.icon) !== null && _a !== void 0 ? _a : defaultIcon;
    return /*#__PURE__*/_react["default"].cloneElement(child, {
      status: status,
      icon: icon
    });
  })));
};

exports.Steps = Steps;