"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloatingBubble = void 0;

var _react = _interopRequireWildcard(require("react"));

var _web = require("@react-spring/web");

var _react2 = require("@use-gesture/react");

var _withDefaultProps = require("../../utils/with-default-props");

var _nativeProps = require("../../utils/native-props");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const classPrefix = `adm-floating-bubble`;
const defaultProps = {};

const FloatingBubble = p => {
  const props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  const boundaryRef = (0, _react.useRef)(null);
  /**
   * memoize the `to` function
   * inside a component that renders frequently
   * to prevent an unintended restart
   */

  const [animationStyles, animation] = (0, _web.useSpring)(() => ({
    y: 0,
    scale: 1,
    opacity: 1
  }));
  const bind = (0, _react2.useDrag)(state => {
    if (state.down) {
      // be movable in y axis
      animation.start({
        y: state.offset[1]
      });
    } // active status


    animation.start({
      scale: state.active ? 1.1 : 1,
      opacity: state.active ? 0.8 : 1
    });
  }, {
    // only trigger if a movement is detected on the specified axis.
    axis: 'y',
    pointer: {
      touch: true
    },
    // the component won't trigger drag logic if the user just clicked on the component.
    filterTaps: true,
    // set constraints to the user gesture
    bounds: boundaryRef
  });
  return (0, _nativeProps.withNativeProps)(props, _react.default.createElement("div", {
    className: classPrefix
  }, _react.default.createElement("div", {
    className: `${classPrefix}-boundary-outer`
  }, _react.default.createElement("div", {
    className: `${classPrefix}-boundary`,
    ref: boundaryRef
  })), _react.default.createElement(_web.animated.div, Object.assign({}, bind(), {
    style: Object.assign({}, animationStyles),
    onClick: props.onClick,
    className: `${classPrefix}-button`
  }), props.children)));
};

exports.FloatingBubble = FloatingBubble;