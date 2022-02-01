"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slide = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@use-gesture/react");

var _web = require("@react-spring/web");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const classPrefix = `adm-image-viewer`;

const Slide = props => {
  const {
    dragLockRef
  } = props;
  const controlRef = (0, _react.useRef)(null);
  const [{
    zoom,
    x,
    y
  }, api] = (0, _web.useSpring)(() => ({
    zoom: 1,
    x: 0,
    y: 0,
    config: {
      tension: 300
    }
  }));
  const pinchLockRef = (0, _react.useRef)(false);
  (0, _react2.useGesture)({
    onDrag: state => {
      if (state.tap && state.elapsedTime > 0) {
        // 判断点击时间>0是为了过滤掉非正常操作，例如用户长按选择图片之后的取消操作（也是一次点击）
        props.onTap();
        return;
      }

      const currentZoom = zoom.get();

      if (dragLockRef) {
        dragLockRef.current = currentZoom !== 1;
      }

      if (!pinchLockRef.current && currentZoom <= 1) {
        api.start({
          x: 0,
          y: 0
        });
      } else {
        const [x, y] = state.offset;
        api.start({
          x,
          y,
          immediate: true
        });
      }
    },
    onPinch: state => {
      var _a;

      pinchLockRef.current = !state.last;
      const [d] = state.offset;
      if (d < 0) return; // pinch的rubberband不会自动弹回bound，这里手动实现了

      const zoom = state.last ? Math.max(Math.min(d, props.maxZoom), 1) : d;
      api.start({
        zoom,
        immediate: !state.last
      });
      (_a = props.onZoomChange) === null || _a === void 0 ? void 0 : _a.call(props, zoom);

      if (state.last && zoom <= 1) {
        api.start({
          x: 0,
          y: 0
        });

        if (dragLockRef) {
          dragLockRef.current = false;
        }
      } else {
        if (dragLockRef) {
          dragLockRef.current = true;
        }
      }
    }
  }, {
    target: controlRef,
    drag: {
      // filterTaps: true,
      from: () => [x.get(), y.get()]
    },
    pinch: {
      from: () => [zoom.get(), 0]
    },
    pointer: {
      touch: true
    }
  });
  return _react.default.createElement("div", {
    className: `${classPrefix}-slide`,
    onPointerMove: e => {
      if (zoom.get() !== 1) {
        e.stopPropagation();
      }
    }
  }, _react.default.createElement("div", {
    className: `${classPrefix}-control`,
    ref: controlRef
  }, _react.default.createElement(_web.animated.div, {
    className: `${classPrefix}-image-wrapper`,
    style: {
      scale: zoom,
      x,
      y
    }
  }, _react.default.createElement("img", {
    src: props.image,
    draggable: false
  }))));
};

exports.Slide = Slide;