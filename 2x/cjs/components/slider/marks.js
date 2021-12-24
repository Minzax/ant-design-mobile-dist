"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classPrefix = "adm-slider-mark";

var Marks = function Marks(_ref) {
  var marks = _ref.marks,
      upperBound = _ref.upperBound,
      lowerBound = _ref.lowerBound,
      max = _ref.max,
      min = _ref.min;
  var marksKeys = Object.keys(marks);
  var range = max - min;
  var elements = marksKeys.map(parseFloat).sort(function (a, b) {
    return a - b;
  }).filter(function (point) {
    return point >= min && point <= max;
  }).map(function (point) {
    var _classNames;

    var markPoint = marks[point];

    if (!markPoint && markPoint !== 0) {
      return null;
    }

    var isActive = point <= upperBound && point >= lowerBound;
    var markClassName = (0, _classnames["default"])((_classNames = {}, _classNames[classPrefix + "-text"] = true, _classNames[classPrefix + "-text-active"] = isActive, _classNames));
    var style = {
      left: (point - min) / range * 100 + "%"
    };
    return /*#__PURE__*/_react["default"].createElement("span", {
      className: markClassName,
      style: style,
      key: point
    }, markPoint);
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix
  }, elements);
};

var _default = Marks;
exports["default"] = _default;