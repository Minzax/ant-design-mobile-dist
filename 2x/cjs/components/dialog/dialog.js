"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dialog = void 0;

var _tslib = require("tslib");

var _react = _interopRequireWildcard(require("react"));

var _withDefaultProps = require("../../utils/with-default-props");

var _classnames = _interopRequireDefault(require("classnames"));

var _ahooks = require("ahooks");

var _mask = _interopRequireDefault(require("../mask"));

var _dialogActionButton = require("./dialog-action-button");

var _image = _interopRequireDefault(require("../image"));

var _renderToContainer = require("../../utils/render-to-container");

var _withStopPropagation = require("../../utils/with-stop-propagation");

var _autoCenter = _interopRequireDefault(require("../auto-center"));

var _web = require("@react-spring/web");

var _nativeProps = require("../../utils/native-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const defaultProps = {
  visible: false,
  actions: [],
  closeOnAction: false,
  closeOnMaskClick: false,
  stopPropagation: ['click'],
  getContainer: null,
  disableBodyScroll: true
};

const Dialog = p => {
  const props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  const unmountedRef = (0, _ahooks.useUnmountedRef)();
  const style = (0, _web.useSpring)({
    scale: props.visible ? 1 : 0.8,
    opacity: props.visible ? 1 : 0,
    config: {
      mass: 1.2,
      tension: 200,
      friction: 25,
      clamp: true
    },
    onStart: () => {
      setActive(true);
    },
    onRest: () => {
      var _a, _b;

      if (unmountedRef.current) return;
      setActive(props.visible);

      if (props.visible) {
        (_a = props.afterShow) === null || _a === void 0 ? void 0 : _a.call(props);
      } else {
        (_b = props.afterClose) === null || _b === void 0 ? void 0 : _b.call(props);
      }
    }
  });
  const [active, setActive] = (0, _react.useState)(props.visible);

  const body = _react.default.createElement("div", {
    className: (0, _classnames.default)(cls('body'), props.image && cls('with-image'), props.bodyClassName),
    style: props.bodyStyle
  }, !!props.image && _react.default.createElement("div", {
    className: cls('image-container')
  }, _react.default.createElement(_image.default, {
    src: props.image,
    alt: 'dialog header image',
    width: '100%'
  })), !!props.header && _react.default.createElement("div", {
    className: cls('header')
  }, _react.default.createElement(_autoCenter.default, null, props.header)), !!props.title && _react.default.createElement("div", {
    className: cls('title')
  }, props.title), _react.default.createElement("div", {
    className: (0, _classnames.default)(cls('content'), !props.content && cls('content-empty'))
  }, typeof props.content === 'string' ? _react.default.createElement(_autoCenter.default, null, props.content) : props.content), _react.default.createElement("div", {
    className: cls('footer')
  }, props.actions.map((row, index) => {
    const actions = Array.isArray(row) ? row : [row];
    return _react.default.createElement("div", {
      className: cls('action-row'),
      key: index
    }, actions.map((action, index) => _react.default.createElement(_dialogActionButton.DialogActionButton, {
      key: action.key,
      action: action,
      onAction: () => (0, _tslib.__awaiter)(void 0, void 0, void 0, function* () {
        var _a, _b, _c;

        yield Promise.all([(_a = action.onClick) === null || _a === void 0 ? void 0 : _a.call(action), (_b = props.onAction) === null || _b === void 0 ? void 0 : _b.call(props, action, index)]);

        if (props.closeOnAction) {
          (_c = props.onClose) === null || _c === void 0 ? void 0 : _c.call(props);
        }
      })
    })));
  })));

  const node = (0, _nativeProps.withNativeProps)(props, _react.default.createElement("div", {
    className: cls(),
    style: {
      display: active ? 'unset' : 'none'
    }
  }, _react.default.createElement(_mask.default, {
    visible: props.visible,
    onMaskClick: props.closeOnMaskClick ? props.onClose : undefined,
    style: props.maskStyle,
    className: (0, _classnames.default)(cls('mask'), props.maskClassName),
    disableBodyScroll: props.disableBodyScroll
  }), _react.default.createElement("div", {
    className: cls('wrap'),
    style: {
      pointerEvents: props.visible ? 'unset' : 'none'
    }
  }, _react.default.createElement(_web.animated.div, {
    style: style
  }, body))));
  return (0, _renderToContainer.renderToContainer)(props.getContainer, (0, _withStopPropagation.withStopPropagation)(props.stopPropagation, node));
};

exports.Dialog = Dialog;

function cls(name = '') {
  return 'adm-dialog' + (name && '-') + name;
}