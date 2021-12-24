"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@use-gesture/react");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var classPrefix = "adm-slider";

var Thumb = function Thumb(props) {
  var value = props.value,
      min = props.min,
      max = props.max,
      disabled = props.disabled,
      onDrag = props.onDrag;
  var prevValue = (0, _react.useRef)(value);

  var currentPosition = function currentPosition() {
    return {
      left: (value - min) / (max - min) * 100 + "%",
      right: 'auto'
    };
  };

  var bind = (0, _react2.useDrag)(function (state) {
    var _a;

    if (disabled) return;

    if (state.first) {
      prevValue.current = value;
    }

    var x = state.xy[0] - state.initial[0];
    var sliderOffsetWith = (_a = props.trackRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth;
    if (!sliderOffsetWith) return;
    var diff = x / Math.ceil(sliderOffsetWith) * (max - min);
    onDrag(prevValue.current + diff, state.first, state.last);
  }, {
    axis: 'x',
    pointer: {
      touch: true
    }
  });
  return /*#__PURE__*/_react["default"].createElement("div", Object.assign({
    className: classPrefix + "-thumb-container",
    style: currentPosition()
  }, bind()), /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-thumb"
  }));
};

var _default = Thumb;
exports["default"] = _default;