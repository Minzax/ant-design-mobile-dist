"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultProps = exports.PullToRefresh = void 0;

var _tslib = require("tslib");

var _withDefaultProps = require("../../utils/with-default-props");

var _web = require("@react-spring/web");

var _react = require("@use-gesture/react");

var _getScrollParent = require("../../utils/get-scroll-parent");

var _react2 = _interopRequireWildcard(require("react"));

var _supportsPassive = require("../../utils/supports-passive");

var _convertPx = require("../../utils/convert-px");

var _rubberband = require("../../utils/rubberband");

var _sleep = require("../../utils/sleep");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const classPrefix = `adm-pull-to-refresh`;
const defaultProps = {
  pullingText: '下拉刷新',
  canReleaseText: '释放立即刷新',
  refreshingText: '加载中……',
  completeText: '刷新成功',
  completeDelay: 500,
  disabled: false,
  onRefresh: () => {}
};
exports.defaultProps = defaultProps;

const PullToRefresh = p => {
  var _a, _b;

  const props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  const headHeight = (_a = props.headHeight) !== null && _a !== void 0 ? _a : (0, _convertPx.convertPx)(40);
  const threshold = (_b = props.threshold) !== null && _b !== void 0 ? _b : (0, _convertPx.convertPx)(60);
  const [status, setStatus] = (0, _react2.useState)('pulling');
  const [springStyles, api] = (0, _web.useSpring)(() => ({
    from: {
      height: 0
    },
    config: {
      tension: 300,
      friction: 30,
      clamp: true
    }
  }));
  const elementRef = (0, _react2.useRef)(null);
  const pullingRef = (0, _react2.useRef)(false);

  function doRefresh() {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function* () {
      api.start({
        height: headHeight
      });
      setStatus('refreshing');

      try {
        yield props.onRefresh();
        setStatus('complete');
      } catch (e) {
        api.start({
          to: next => (0, _tslib.__awaiter)(this, void 0, void 0, function* () {
            yield next({
              height: 0
            });
            setStatus('pulling');
          })
        });
        throw e;
      }

      if (props.completeDelay > 0) {
        yield (0, _sleep.sleep)(props.completeDelay);
      }

      api.start({
        to: next => (0, _tslib.__awaiter)(this, void 0, void 0, function* () {
          yield next({
            height: 0
          });
          setStatus('pulling');
        })
      });
    });
  }

  (0, _react.useDrag)(state => {
    if (status === 'refreshing' || status === 'complete') return;
    const {
      event
    } = state;

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

    const [, y] = state.movement;

    if (state.first) {
      const element = elementRef.current;
      if (!element) return;
      const scrollParent = (0, _getScrollParent.getScrollParent)(element);
      if (!scrollParent) return;
      const top = 'scrollTop' in scrollParent ? scrollParent.scrollTop : scrollParent.pageYOffset;

      if (top <= 0 && y > 0) {
        pullingRef.current = true;
      }
    }

    if (!pullingRef.current) return;

    if (event.cancelable) {
      event.preventDefault();
    }

    event.stopPropagation();
    const height = Math.max((0, _rubberband.rubberbandIfOutOfBounds)(y, 0, 0, headHeight * 5, 0.5), 0);
    api.start({
      height
    });
    setStatus(height > threshold ? 'canRelease' : 'pulling');
  }, {
    pointer: {
      touch: true
    },
    axis: 'y',
    target: elementRef,
    enabled: !props.disabled,
    eventOptions: _supportsPassive.supportsPassive ? {
      passive: false
    } : false
  });

  const renderStatusText = () => {
    var _a;

    if (props.renderText) {
      return (_a = props.renderText) === null || _a === void 0 ? void 0 : _a.call(props, status);
    }

    if (status === 'pulling') return props.pullingText;
    if (status === 'canRelease') return props.canReleaseText;
    if (status === 'refreshing') return props.refreshingText;
    if (status === 'complete') return props.completeText;
  };

  return _react2.default.createElement(_web.animated.div, {
    ref: elementRef,
    className: classPrefix
  }, _react2.default.createElement(_web.animated.div, {
    style: springStyles,
    className: `${classPrefix}-head`
  }, _react2.default.createElement("div", {
    className: `${classPrefix}-head-content`,
    style: {
      height: headHeight
    }
  }, renderStatusText())), _react2.default.createElement("div", {
    className: `${classPrefix}-content`
  }, props.children));
};

exports.PullToRefresh = PullToRefresh;