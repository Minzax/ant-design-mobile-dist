"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _dotLoading = _interopRequireDefault(require("../dot-loading"));

var _withDefaultProps = require("../../utils/with-default-props");

var _nativeProps = require("../../utils/native-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const classPrefix = `adm-button`;
const defaultProps = {
  color: 'default',
  fill: 'solid',
  block: false,
  loading: false,
  type: 'button',
  shape: 'default',
  size: 'middle'
};
const Button = (0, _react.forwardRef)((p, ref) => {
  const props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  const disabled = props.disabled || props.loading;
  const nativeButtonRef = (0, _react.useRef)(null);
  (0, _react.useImperativeHandle)(ref, () => ({
    get nativeElement() {
      return nativeButtonRef.current;
    }

  }));
  return (0, _nativeProps.withNativeProps)(props, _react.default.createElement("button", {
    ref: nativeButtonRef,
    type: props.type,
    onClick: props.onClick,
    className: (0, _classnames.default)(classPrefix, props.color ? `${classPrefix}-${props.color}` : null, {
      [`${classPrefix}-block`]: props.block,
      [`${classPrefix}-disabled`]: disabled,
      [`${classPrefix}-fill-outline`]: props.fill === 'outline',
      [`${classPrefix}-fill-none`]: props.fill === 'none',
      [`${classPrefix}-mini`]: props.size === 'mini',
      [`${classPrefix}-small`]: props.size === 'small',
      [`${classPrefix}-large`]: props.size === 'large',
      [`${classPrefix}-loading`]: props.loading
    }, `${classPrefix}-shape-${props.shape}`),
    disabled: disabled
  }, props.loading ? _react.default.createElement("div", {
    className: `${classPrefix}-loading-wrapper`
  }, _react.default.createElement(_dotLoading.default, {
    color: 'currentColor'
  }), props.loadingText) : props.children));
});
exports.Button = Button;