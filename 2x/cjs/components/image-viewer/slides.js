"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slides = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@use-gesture/react");

var _web = require("@react-spring/web");

var _slide = require("./slide");

var _convertPx = require("../../utils/convert-px");

var _bound = require("../../utils/bound");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var classPrefix = "adm-image-viewer";

var Slides = function Slides(props) {
  var slideWidth = window.innerWidth + (0, _convertPx.convertPx)(16);

  var _useSpring = (0, _web.useSpring)(function () {
    return {
      x: props.defaultIndex * slideWidth,
      config: {
        tension: 250,
        clamp: true
      }
    };
  }),
      x = _useSpring[0].x,
      api = _useSpring[1];

  var count = props.images.length;
  var dragLockRef = (0, _react.useRef)(false);
  var bind = (0, _react2.useDrag)(function (state) {
    var _a;

    if (dragLockRef.current) return;
    var _state$offset = state.offset,
        offsetX = _state$offset[0];

    if (state.last) {
      var minIndex = Math.floor(offsetX / slideWidth);
      var maxIndex = minIndex + 1;
      var velocityOffset = Math.min(state.velocity[0] * 2000, slideWidth) * state.direction[0];
      var index = (0, _bound.bound)((0, _bound.bound)(Math.round((offsetX + velocityOffset) / slideWidth), minIndex, maxIndex), 0, count - 1);
      (_a = props.onIndexChange) === null || _a === void 0 ? void 0 : _a.call(props, index);
      api.start({
        x: index * slideWidth
      });
    } else {
      api.start({
        x: offsetX,
        immediate: true
      });
    }
  }, {
    transform: function transform(_ref) {
      var x = _ref[0],
          y = _ref[1];
      return [-x, y];
    },
    from: function from() {
      return [x.get(), 0];
    },
    bounds: function bounds() {
      return {
        left: 0,
        right: (count - 1) * slideWidth
      };
    },
    rubberband: true,
    axis: 'x',
    pointer: {
      touch: true
    }
  });
  return /*#__PURE__*/_react["default"].createElement("div", Object.assign({
    className: classPrefix + "-slides"
  }, bind()), /*#__PURE__*/_react["default"].createElement(_web.animated.div, {
    className: classPrefix + "-indicator"
  }, x.to(function (v) {
    var index = (0, _bound.bound)(Math.round(v / slideWidth), 0, count - 1);
    return index + 1 + " / " + count;
  })), /*#__PURE__*/_react["default"].createElement(_web.animated.div, {
    className: classPrefix + "-slides-inner",
    style: {
      x: x.to(function (x) {
        return -x;
      })
    }
  }, props.images.map(function (image) {
    return /*#__PURE__*/_react["default"].createElement(_slide.Slide, {
      key: image,
      image: image,
      onTap: props.onTap,
      maxZoom: props.maxZoom,
      onZoomChange: function onZoomChange(zoom) {
        if (zoom !== 1) {
          var index = Math.round(x.get() / slideWidth);
          api.start({
            x: index * slideWidth
          });
        }
      },
      dragLockRef: dragLockRef
    });
  })));
};

exports.Slides = Slides;