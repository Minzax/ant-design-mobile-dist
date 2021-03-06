"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Popover = void 0;

var _tslib = require("tslib");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _usePropsValue = require("../../utils/use-props-value");

var _withDefaultProps = require("../../utils/with-default-props");

var _nativeProps = require("../../utils/native-props");

var _withStopPropagation = require("../../utils/with-stop-propagation");

var _arrow = require("./arrow");

var _renderToContainer = require("../../utils/render-to-container");

var _dom = require("@floating-ui/dom");

var _wrapper = require("./wrapper");

var _shouldRender = require("../../utils/should-render");

var _ahooks = require("ahooks");

var _normalizePlacement = require("./normalize-placement");

var _convertPx = require("../../utils/convert-px");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const classPrefix = `adm-popover`;
const defaultProps = {
  placement: 'top',
  defaultVisible: false,
  stopPropagation: ['click'],
  getContainer: () => document.body
};
const Popover = (0, _react.forwardRef)((p, ref) => {
  const props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  const {
    mode = 'light'
  } = props;
  const placement = (0, _normalizePlacement.normalizePlacement)(props.placement);
  const [visible, setVisible] = (0, _usePropsValue.usePropsValue)({
    value: props.visible,
    defaultValue: props.defaultVisible,
    onChange: props.onVisibleChange
  });
  (0, _react.useImperativeHandle)(ref, () => {
    return {
      show: () => setVisible(true),
      hide: () => setVisible(false),
      visible
    };
  }, [visible]);
  const targetRef = (0, _react.useRef)(null);
  const floatingRef = (0, _react.useRef)(null);
  const arrowRef = (0, _react.useRef)(null);
  const floating = (0, _withStopPropagation.withStopPropagation)(props.stopPropagation, (0, _nativeProps.withNativeProps)(props, _react.default.createElement("div", {
    className: (0, _classnames.default)(classPrefix, `${classPrefix}-${mode}`, !visible && `${classPrefix}-hidden`),
    ref: floatingRef
  }, _react.default.createElement("div", {
    className: `${classPrefix}-arrow`,
    ref: arrowRef
  }, _react.default.createElement(_arrow.Arrow, {
    className: `${classPrefix}-arrow-icon`
  })), _react.default.createElement("div", {
    className: `${classPrefix}-inner`
  }, _react.default.createElement("div", {
    className: `${classPrefix}-inner-content`
  }, props.content)))));
  const [targetElement, setTargetElement] = (0, _react.useState)(null);

  function update() {
    var _a, _b, _c;

    return (0, _tslib.__awaiter)(this, void 0, void 0, function* () {
      const target = (_b = (_a = targetRef.current) === null || _a === void 0 ? void 0 : _a.element) !== null && _b !== void 0 ? _b : null;
      const floating = floatingRef.current;
      const arrowElement = arrowRef.current;
      setTargetElement(target);
      if (!target || !floating || !arrowElement) return;
      const {
        x,
        y,
        placement: realPlacement,
        middlewareData
      } = yield (0, _dom.computePosition)(target, floating, {
        placement,
        middleware: [(0, _dom.offset)((0, _convertPx.convertPx)(12)), (0, _dom.shift)({
          padding: (0, _convertPx.convertPx)(4),
          crossAxis: false,
          limiter: (0, _dom.limitShift)()
        }), (0, _dom.flip)(), (0, _dom.hide)(), (0, _dom.arrow)({
          element: arrowElement,
          padding: (0, _convertPx.convertPx)(12)
        })]
      });
      Object.assign(floating.style, {
        left: `${x}px`,
        top: `${y}px`
      });
      const side = realPlacement.split('-')[0];
      const arrowSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right'
      }[side];
      const {
        x: arrowX,
        y: arrowY
      } = (_c = middlewareData.arrow) !== null && _c !== void 0 ? _c : {};
      Object.assign(arrowElement.style, {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : '',
        right: '',
        bottom: '',
        [arrowSide]: `-${(0, _convertPx.convertPx)(8)}px`
      });
      const arrowRotate = {
        top: '0deg',
        bottom: '180deg',
        left: '270deg',
        right: '90deg'
      }[side];
      arrowElement.style.setProperty('--arrow-icon-rotate', arrowRotate);
    });
  }

  (0, _ahooks.useIsomorphicLayoutEffect)(() => {
    update();
  });
  (0, _react.useEffect)(() => {
    if (!targetElement) return;
    if (!props.trigger) return;

    function handleClick() {
      setVisible(v => !v);
    }

    targetElement.addEventListener('click', handleClick);
    return () => {
      targetElement.removeEventListener('click', handleClick);
    };
  }, [targetElement, props.trigger]);
  (0, _react.useEffect)(() => {
    const floatingElement = floatingRef.current;
    if (!targetElement || !floatingElement) return;
    return (0, _dom.autoUpdate)(targetElement, floatingElement, update);
  }, [targetElement]);
  (0, _ahooks.useClickAway)(() => {
    if (!props.trigger) return;
    setVisible(false);
  }, () => {
    var _a;

    return (_a = targetRef.current) === null || _a === void 0 ? void 0 : _a.element;
  });
  const shouldRender = (0, _shouldRender.useShouldRender)(visible, false, props.destroyOnHide);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_wrapper.Wrapper, {
    ref: targetRef
  }, props.children), shouldRender && (0, _renderToContainer.renderToContainer)(props.getContainer, floating));
});
exports.Popover = Popover;