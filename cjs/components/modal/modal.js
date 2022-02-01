"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = void 0;

var _tslib = require("tslib");

var _react = _interopRequireWildcard(require("react"));

var _withDefaultProps = require("../../utils/with-default-props");

var _classnames = _interopRequireDefault(require("classnames"));

var _ahooks = require("ahooks");

var _mask = _interopRequireDefault(require("../mask"));

var _modalActionButton = require("./modal-action-button");

var _image = _interopRequireDefault(require("../image"));

var _space = _interopRequireDefault(require("../space"));

var _renderToContainer = require("../../utils/render-to-container");

var _withStopPropagation = require("../../utils/with-stop-propagation");

var _autoCenter = _interopRequireDefault(require("../auto-center"));

var _web = require("@react-spring/web");

var _nativeProps = require("../../utils/native-props");

var _antdMobileIcons = require("antd-mobile-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const classPrefix = `adm-modal`;
const defaultProps = {
  visible: false,
  actions: [],
  closeOnAction: false,
  closeOnMaskClick: false,
  stopPropagation: ['click'],
  showCloseButton: false,
  getContainer: null
};

const Modal = p => {
  const props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  const unmountedRef = (0, _ahooks.useUnmountedRef)();
  const style = (0, _web.useSpring)({
    scale: props.visible ? 1 : 0.8,
    opacity: props.visible ? 1 : 0,
    config: {
      mass: 1,
      tension: 200,
      friction: 30,
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
  const node = (0, _withStopPropagation.withStopPropagation)(props.stopPropagation, (0, _nativeProps.withNativeProps)(props, _react.default.createElement("div", {
    className: classPrefix,
    style: {
      display: active ? 'unset' : 'none'
    }
  }, _react.default.createElement(_mask.default, {
    visible: props.visible,
    onMaskClick: props.closeOnMaskClick ? props.onClose : undefined,
    style: props.maskStyle,
    className: (0, _classnames.default)(`${classPrefix}-mask`, props.maskClassName)
  }), _react.default.createElement("div", {
    className: `${classPrefix}-wrap`,
    style: {
      pointerEvents: props.visible ? 'unset' : 'none'
    }
  }, _react.default.createElement(_web.animated.div, {
    style: Object.assign({}, style),
    onClick: e => e.stopPropagation(),
    className: `${classPrefix}-main`
  }, props.showCloseButton && _react.default.createElement("a", {
    className: (0, _classnames.default)(`${classPrefix}-close`, 'adm-plain-anchor'),
    onClick: props.onClose
  }, _react.default.createElement(_antdMobileIcons.CloseOutline, null)), !!props.image && _react.default.createElement("div", {
    className: `${classPrefix}-image-container`
  }, _react.default.createElement(_image.default, {
    src: props.image,
    alt: 'modal header image',
    width: '100%'
  })), _react.default.createElement("div", {
    style: props.bodyStyle,
    className: (0, _classnames.default)(`${classPrefix}-body`, props.bodyClassName)
  }, !!props.header && _react.default.createElement("div", {
    className: `${classPrefix}-body-header-wrapper`
  }, _react.default.createElement("div", {
    className: `${classPrefix}-body-header`
  }, props.header)), !!props.title && _react.default.createElement("div", {
    className: `${classPrefix}-body-title`
  }, props.title), !!props.content && _react.default.createElement("div", {
    className: `${classPrefix}-body-content`
  }, typeof props.content === 'string' ? _react.default.createElement(_autoCenter.default, null, props.content) : props.content)), _react.default.createElement(_space.default, {
    direction: 'vertical',
    block: true,
    className: `${classPrefix}-footer`
  }, props.actions.map((action, index) => {
    return _react.default.createElement(_modalActionButton.ModalActionButton, {
      key: action.key,
      action: action,
      onAction: () => (0, _tslib.__awaiter)(void 0, void 0, void 0, function* () {
        var _a, _b, _c;

        yield Promise.all([(_a = action.onClick) === null || _a === void 0 ? void 0 : _a.call(action), (_b = props.onAction) === null || _b === void 0 ? void 0 : _b.call(props, action, index)]);

        if (props.closeOnAction) {
          (_c = props.onClose) === null || _c === void 0 ? void 0 : _c.call(props);
        }
      })
    });
  })))))));
  return (0, _renderToContainer.renderToContainer)(props.getContainer, node);
};

exports.Modal = Modal;