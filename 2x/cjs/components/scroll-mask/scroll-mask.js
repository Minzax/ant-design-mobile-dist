"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollMask = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _web = require("@react-spring/web");

var _ahooks = require("ahooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var classPrefix = "adm-scroll-mask";

var ScrollMask = function ScrollMask(props) {
  var maskRef = (0, _react.useRef)(null);

  var _useSpring = (0, _web.useSpring)(function () {
    return {
      leftMaskOpacity: 0,
      rightMaskOpacity: 0,
      config: {
        clamp: true
      }
    };
  }),
      _useSpring$ = _useSpring[0],
      leftMaskOpacity = _useSpring$.leftMaskOpacity,
      rightMaskOpacity = _useSpring$.rightMaskOpacity,
      api = _useSpring[1];

  var _useThrottleFn = (0, _ahooks.useThrottleFn)(function (immediate) {
    if (immediate === void 0) {
      immediate = false;
    }

    var mask = maskRef.current;
    if (!mask) return;
    var scrollEl = props.scrollTrackRef.current;
    if (!scrollEl) return;
    var scrollLeft = scrollEl.scrollLeft;
    var showLeftMask = scrollLeft > 0;
    var showRightMask = scrollLeft + scrollEl.offsetWidth < scrollEl.scrollWidth;
    api.start({
      leftMaskOpacity: showLeftMask ? 1 : 0,
      rightMaskOpacity: showRightMask ? 1 : 0,
      immediate: immediate
    });
  }, {
    wait: 100,
    trailing: true,
    leading: true
  }),
      updateMask = _useThrottleFn.run;

  (0, _react.useEffect)(function () {
    updateMask(true);
  }, []);
  (0, _react.useEffect)(function () {
    var scrollEl = props.scrollTrackRef.current;
    if (!scrollEl) return;
    scrollEl.addEventListener('scroll', updateMask);
    return function () {
      return scrollEl.removeEventListener('scroll', updateMask);
    };
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_web.animated.div, {
    ref: maskRef,
    className: (0, _classnames["default"])(classPrefix, classPrefix + "-left"),
    style: {
      opacity: leftMaskOpacity
    }
  }), /*#__PURE__*/_react["default"].createElement(_web.animated.div, {
    className: (0, _classnames["default"])(classPrefix, classPrefix + "-right"),
    style: {
      opacity: rightMaskOpacity
    }
  }));
};

exports.ScrollMask = ScrollMask;