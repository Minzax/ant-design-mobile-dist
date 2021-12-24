var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
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

import { mergeProps } from '../../utils/with-default-props';
import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { getScrollParent } from '../../utils/get-scroll-parent';
import React, { useRef, useState } from 'react';
import { supportsPassive } from '../../utils/supports-passive';
import { convertPx } from '../../utils/convert-px';
import { rubberbandIfOutOfBounds } from '../../utils/rubberband';
import { sleep } from '../../utils/sleep';
var classPrefix = "adm-pull-to-refresh";
export var defaultProps = {
  pullingText: '下拉刷新',
  canReleaseText: '释放立即刷新',
  refreshingText: '加载中……',
  completeText: '刷新成功',
  completeDelay: 500,
  onRefresh: function onRefresh() {}
};
export var PullToRefresh = function PullToRefresh(p) {
  var _a, _b;

  var props = mergeProps(defaultProps, p);
  var headHeight = (_a = props.headHeight) !== null && _a !== void 0 ? _a : convertPx(40);
  var threshold = (_b = props.threshold) !== null && _b !== void 0 ? _b : convertPx(60);

  var _useState = useState('pulling'),
      status = _useState[0],
      setStatus = _useState[1];

  var _useSpring = useSpring(function () {
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

  var elementRef = useRef(null);
  var pullingRef = useRef(false);

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
              return sleep(props.completeDelay);

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

  useDrag(function (state) {
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
      var scrollParent = getScrollParent(element);
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
    var height = Math.max(rubberbandIfOutOfBounds(y, 0, 0, headHeight * 5, 0.5), 0);
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
    eventOptions: supportsPassive ? {
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

  return /*#__PURE__*/React.createElement(animated.div, {
    ref: elementRef,
    className: classPrefix
  }, /*#__PURE__*/React.createElement(animated.div, {
    style: springStyles,
    className: classPrefix + "-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-head-content",
    style: {
      height: headHeight
    }
  }, renderStatusText())), /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-content"
  }, props.children));
};