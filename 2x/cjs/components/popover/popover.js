"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Popover = void 0;

var _react = _interopRequireWildcard(require("react"));

var _rcTooltip = _interopRequireDefault(require("rc-tooltip"));

var _classnames = _interopRequireDefault(require("classnames"));

var _usePropsValue2 = require("../../utils/use-props-value");

var _withDefaultProps = require("../../utils/with-default-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var classPrefix = "adm-popover";
var enterClassName = 'entering';
var leaveClassName = 'leaving';
var defaultProps = {
  defaultVisible: false
};
var Popover = /*#__PURE__*/(0, _react.forwardRef)(function (p, ref) {
  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  var _props$mode = props.mode,
      mode = _props$mode === void 0 ? 'light' : _props$mode;

  var _usePropsValue = (0, _usePropsValue2.usePropsValue)({
    value: props.visible,
    defaultValue: props.defaultVisible,
    onChange: props.onVisibleChange
  }),
      visible = _usePropsValue[0],
      setVisible = _usePropsValue[1];

  (0, _react.useImperativeHandle)(ref, function () {
    return {
      show: function show() {
        return setVisible(true);
      },
      hide: function hide() {
        return setVisible(false);
      },
      visible: visible
    };
  }, [visible]);
  return /*#__PURE__*/_react["default"].createElement(_rcTooltip["default"], Object.assign({}, props, {
    overlayClassName: (0, _classnames["default"])(classPrefix + "-" + mode, props.overlayClassName),
    destroyTooltipOnHide: props.destroyOnHide,
    prefixCls: classPrefix,
    getTooltipContainer: props.getContainer || function () {
      return document.body;
    },
    visible: visible,
    onVisibleChange: setVisible,
    trigger: props.trigger,
    motion: {
      motionName: {
        appear: enterClassName,
        appearActive: enterClassName,
        enter: enterClassName,
        enterActive: enterClassName,
        leaveActive: leaveClassName,
        leave: leaveClassName
      },
      motionDeadline: 200
    },
    overlay: /*#__PURE__*/_react["default"].createElement("div", {
      className: classPrefix + "-inner-content"
    }, props.content)
  }), props.children);
});
exports.Popover = Popover;