"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckIcon = void 0;

var _react = _interopRequireWildcard(require("react"));

var _nativeProps = require("../../utils/native-props");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var CheckIcon = /*#__PURE__*/(0, _react.memo)(function (props) {
  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("svg", {
    viewBox: '0 0 24 16'
  }, /*#__PURE__*/_react["default"].createElement("g", {
    stroke: 'none',
    strokeWidth: '1',
    fill: 'none',
    fillRule: 'evenodd'
  }, /*#__PURE__*/_react["default"].createElement("g", {
    transform: 'translate(-35.000000, -40.000000)',
    fill: 'currentColor'
  }, /*#__PURE__*/_react["default"].createElement("g", {
    transform: 'translate(24.000000, 26.000000)'
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: 'M18.8574375,25.9363304 L14.4138058,21.4926987 C13.8001225,20.8790154 12.8051453,20.8790154 12.1914621,21.4926987 C11.5777807,22.10638 11.5777807,23.1013541 12.1914621,23.7150354 C12.1914632,23.7150366 12.1914644,23.7150377 12.1914656,23.7150389 L17.4442507,28.9677909 C18.225314,29.7488091 19.4916285,29.7488141 20.2726979,28.9678021 L21.0808125,28.1597054 L21.0808125,28.1597054 L32.5627182,16.6759191 C33.176366,16.0621709 33.1763252,15.0671824 32.5626272,14.4534844 C31.948944,13.8398011 30.9539668,13.8398011 30.3402835,14.4534844 L18.8574375,25.9363304 L18.8574375,25.9363304 Z'
  }))))));
});
exports.CheckIcon = CheckIcon;