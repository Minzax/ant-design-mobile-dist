"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Arrow = void 0;

var _react = _interopRequireWildcard(require("react"));

var _nativeProps = require("../../utils/native-props");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Arrow = (0, _react.memo)(props => {
  return (0, _nativeProps.withNativeProps)(props, _react.default.createElement("svg", {
    viewBox: '0 0 30 16'
  }, _react.default.createElement("g", {
    transform: 'translate(-1300.000000, -841.000000)',
    fill: 'currentColor'
  }, _react.default.createElement("path", {
    d: 'M1300,841 L1330,841 L1318.07289,855.312538 C1316.65863,857.009645 1314.13637,857.238942 1312.43926,855.824685 C1312.25341,855.669808 1312.08199,855.49839 1311.92711,855.312538 L1300,841 L1300,841 Z'
  }))));
});
exports.Arrow = Arrow;