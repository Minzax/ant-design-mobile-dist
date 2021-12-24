"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classPrefix = "adm-slider";

var Ticks = function Ticks(_ref) {
  var points = _ref.points,
      max = _ref.max,
      min = _ref.min,
      upperBound = _ref.upperBound,
      lowerBound = _ref.lowerBound;
  var range = max - min;
  var elements = points.map(function (point) {
    var _classNames;

    var offset = Math.abs(point - min) / range * 100 + "%";
    var isActived = point <= upperBound && point >= lowerBound;
    var style = {
      left: offset
    };
    var pointClassName = (0, _classnames["default"])((_classNames = {}, _classNames[classPrefix + "-tick"] = true, _classNames[classPrefix + "-tick-active"] = isActived, _classNames));
    return /*#__PURE__*/_react["default"].createElement("span", {
      className: pointClassName,
      style: style,
      key: point
    });
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-ticks"
  }, elements);
};

var _default = Ticks;
exports["default"] = _default;