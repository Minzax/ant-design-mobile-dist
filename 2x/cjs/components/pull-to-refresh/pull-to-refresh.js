"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultProps = exports.PullToRefresh = void 0;

var _withDefaultProps = require("../../utils/with-default-props");

var _web = require("@react-spring/web");

var _react = require("@use-gesture/react");

var _getScrollParent = require("../../utils/get-scroll-parent");

var _react2 = _interopRequireWildcard(require("react"));

var _supportsPassive = require("../../utils/supports-passive");

var _convertPx = require("../../utils/convert-px");

var _rubberband = require("../../utils/rubberband");

var _sleep = require("../../utils/sleep");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var classPrefix = "adm-pull-to-refresh";
var defaultProps = {
  pullingText: '下拉刷新',
  canReleaseText: '释放立即刷新',
  refreshingText: '加载中……',
  completeText: '刷新成功',
  completeDelay: 500,
  onRefresh: function onRefresh() {}
};
exports.defaultProps = defaultProps;

var PullToRefresh = function PullToRefresh(p) {
  var _a, _b;

  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  var headHeight = (_a = props.headHeight) !== null && _a !== void 0 ? _a : (0, _convertPx.convertPx)(40);
  var threshold = (_b = props.threshold) !== null && _b !== void 0 ? _b : (0, _convertPx.convertPx)(60);

  var _useState = (0, _react2.useState)('pulling'),
      status = _useState[0],
      setStatus = _useState[1];

  var _useSpring = (0, _web.useSpring)(function () {
    return {
      from: {
        height: 0
      },
      config: {
        tension: 300,
        friction: 30,
        clamp: true
      }
    };
  }),
      springStyles = _useSpring[0],
      api = _useSpring[1];

  var elementRef = (0, _react2.useRef)(null);
  var pullingRef = (0, _react2.useRef)(false);

  function doRefresh() {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var _this = this;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              api.start({
                height: headHeight
              });
              setStatus('refreshing');
              _context3.prev = 2;
              _context3.next = 5;
              return props.onRefresh();

            case 5:
              setStatus('complete');
              _context3.next = 12;
              break;

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](2);
              api.start({
                to: function to(next) {
                  return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return next({
                              height: 0
                            });

                          case 2:
                            setStatus('pulling');

                          case 3:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));
                }
              });
              throw _context3.t0;

            case 12:
              if (!(props.completeDelay > 0)) {
                _context3.next = 15;
                break;
              }

              _context3.next = 15;
              return (0, _sleep.sleep)(props.completeDelay);

            case 15:
              api.start({
                to: function to(next) {
                  return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return next({
                              height: 0
                            });

                          case 2:
                            setStatus('pulling');

                          case 3:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));
                }
              });

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[2, 8]]);
    }));
  }

  (0, _react.useDrag)(function (state) {
    if (status === 'refreshing' || status === 'complete') return;
    var event = state.event;

    if (state.last) {
      pullingRef.current = false;

      if (status === 'canRelease') {
        doRefresh();
      } else {
        api.start({
          height: 0
        });
      }

      return;
    }

    var _state$movement = state.movement,
        y = _state$movement[1];

    if (state.first) {
      var element = elementRef.current;
      if (!element) return;
      var scrollParent = (0, _getScrollParent.getScrollParent)(element);
      if (!scrollParent) return;
      var top = 'scrollTop' in scrollParent ? scrollParent.scrollTop : scrollParent.pageYOffset;

      if (top <= 0 && y > 0) {
        pullingRef.current = true;
      }
    }

    if (!pullingRef.current) return;

    if (event.cancelable) {
      event.preventDefault();
    }

    event.stopPropagation();
    var height = Math.max((0, _rubberband.rubberbandIfOutOfBounds)(y, 0, 0, headHeight * 5, 0.5), 0);
    api.start({
      height: height
    });
    setStatus(height > threshold ? 'canRelease' : 'pulling');
  }, {
    pointer: {
      touch: true
    },
    axis: 'y',
    target: elementRef,
    eventOptions: _supportsPassive.supportsPassive ? {
      passive: false
    } : false
  });

  var renderStatusText = function renderStatusText() {
    var _a;

    if (props.renderText) {
      return (_a = props.renderText) === null || _a === void 0 ? void 0 : _a.call(props, status);
    }

    if (status === 'pulling') return props.pullingText;
    if (status === 'canRelease') return props.canReleaseText;
    if (status === 'refreshing') return props.refreshingText;
    if (status === 'complete') return props.completeText;
  };

  return /*#__PURE__*/_react2["default"].createElement(_web.animated.div, {
    ref: elementRef,
    className: classPrefix
  }, /*#__PURE__*/_react2["default"].createElement(_web.animated.div, {
    style: springStyles,
    className: classPrefix + "-head"
  }, /*#__PURE__*/_react2["default"].createElement("div", {
    className: classPrefix + "-head-content",
    style: {
      height: headHeight
    }
  }, renderStatusText())), /*#__PURE__*/_react2["default"].createElement("div", {
    className: classPrefix + "-content"
  }, props.children));
};

exports.PullToRefresh = PullToRefresh;