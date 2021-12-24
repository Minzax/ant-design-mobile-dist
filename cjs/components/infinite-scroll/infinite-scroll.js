"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfiniteScroll = void 0;

var _withDefaultProps = require("../../utils/with-default-props");

var _react = _interopRequireWildcard(require("react"));

var _ahooks = require("ahooks");

var _nativeProps = require("../../utils/native-props");

var _getScrollParent = require("../../utils/get-scroll-parent");

var _loading = _interopRequireDefault(require("../loading"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function isWindow(element) {
  return element === window;
}

var classPrefix = "adm-infinite-scroll";

var InfiniteScrollContent = function InfiniteScrollContent(_ref) {
  var hasMore = _ref.hasMore;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, hasMore ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", null, "\u52A0\u8F7D\u4E2D"), /*#__PURE__*/_react["default"].createElement(_loading["default"], null)) : /*#__PURE__*/_react["default"].createElement("span", null, "\u6CA1\u6709\u66F4\u591A\u4E86"));
};

var InfiniteScroll = function InfiniteScroll(p) {
  var props = (0, _withDefaultProps.mergeProps)({
    threshold: 250
  }, p);
  var doLoadMore = (0, _ahooks.useLockFn)(function () {
    return props.loadMore();
  });
  var elementRef = (0, _react.useRef)(null);
  var checkTimeoutRef = (0, _react.useRef)();
  var check = (0, _ahooks.usePersistFn)(function () {
    window.clearTimeout(checkTimeoutRef.current);
    checkTimeoutRef.current = window.setTimeout(function () {
      if (!props.hasMore) return;
      var element = elementRef.current;
      if (!element) return;
      if (!element.offsetParent) return;
      var parent = (0, _getScrollParent.getScrollParent)(element);
      if (!parent) return;
      var rect = element.getBoundingClientRect();
      var elementTop = rect.top;
      var current = isWindow(parent) ? window.innerHeight : parent.getBoundingClientRect().bottom;

      if (current >= elementTop - props.threshold) {
        doLoadMore();
      }
    });
  }); // 确保在内容不足时会自动触发加载事件

  (0, _react.useEffect)(function () {
    check();
  });
  (0, _react.useEffect)(function () {
    var element = elementRef.current;
    if (!element) return;
    var parent = (0, _getScrollParent.getScrollParent)(element);
    if (!parent) return;

    function onScroll() {
      check();
    }

    parent.addEventListener('scroll', onScroll);
    return function () {
      parent.removeEventListener('scroll', onScroll);
    };
  }, []);
  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix,
    ref: elementRef
  }, props.children && props.children, !props.children && /*#__PURE__*/_react["default"].createElement(InfiniteScrollContent, {
    hasMore: props.hasMore
  })));
};

exports.InfiniteScroll = InfiniteScroll;