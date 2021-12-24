"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ahooks = require("ahooks");

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _popup = _interopRequireDefault(require("../popup"));

var _item = require("./item");

var _nativeProps = require("../../utils/native-props");

var _withDefaultProps = require("../../utils/with-default-props");

var _usePropsValue2 = require("../../utils/use-props-value");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classPrefix = "adm-dropdown";
var defaultProps = {
  defaultActiveKey: null,
  closeOnMaskClick: true
};
var Dropdown = /*#__PURE__*/(0, _react.forwardRef)(function (p, ref) {
  var _classNames;

  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);

  var _usePropsValue = (0, _usePropsValue2.usePropsValue)({
    value: props.activeKey,
    defaultValue: props.defaultActiveKey,
    onChange: props.onChange
  }),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var navRef = (0, _react.useRef)(null);
  var contentRef = (0, _react.useRef)(null); // 点击外部区域，关闭

  (0, _ahooks.useClickAway)(function () {
    setValue(null);
  }, [navRef, contentRef]); // 计算 navs 的 top 值

  var _useState = (0, _react.useState)(),
      top = _useState[0],
      setTop = _useState[1];

  var containerRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var container = containerRef.current;
    if (!container) return;

    if (value) {
      var rect = container.getBoundingClientRect();
      setTop(rect.bottom);
    }
  }, [value]);

  var changeActive = function changeActive(key) {
    if (value === key) {
      setValue(null);
    } else {
      setValue(key);
    }
  };

  var popupForceRender = false;
  var items = [];

  var navs = _react["default"].Children.map(props.children, function (child) {
    if ( /*#__PURE__*/_react["default"].isValidElement(child)) {
      var childProps = Object.assign(Object.assign({}, child.props), {
        onClick: function onClick() {
          changeActive(child.key);
        },
        active: child.key === value,
        arrow: child.props.arrow === undefined ? props.arrow : child.props.arrow
      });
      items.push(child);
      if (child.props.forceRender) popupForceRender = true;
      return /*#__PURE__*/(0, _react.cloneElement)(child, childProps);
    } else {
      return child;
    }
  });

  (0, _react.useImperativeHandle)(ref, function () {
    return {
      close: function close() {
        setValue(null);
      }
    };
  }, [setValue]);
  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(classPrefix, (_classNames = {}, _classNames[classPrefix + "-open"] = !!value, _classNames)),
    ref: containerRef
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-nav",
    ref: navRef
  }, navs), /*#__PURE__*/_react["default"].createElement(_popup["default"], {
    visible: !!value,
    position: 'top',
    className: classPrefix + "-popup",
    maskClassName: classPrefix + "-popup-mask",
    bodyClassName: classPrefix + "-popup-body",
    style: {
      top: top
    },
    forceRender: popupForceRender,
    onMaskClick: props.closeOnMaskClick ? function () {
      changeActive(null);
    } : undefined
  }, /*#__PURE__*/_react["default"].createElement("div", {
    ref: contentRef
  }, items.map(function (item) {
    var isActive = item.key === value;
    return /*#__PURE__*/_react["default"].createElement(_item.ItemChildrenWrap, {
      key: item.key,
      active: isActive,
      forceRender: item.props.forceRender,
      destroyOnClose: item.props.destroyOnClose
    }, item.props.children);
  })))));
});
var _default = Dropdown;
exports["default"] = _default;