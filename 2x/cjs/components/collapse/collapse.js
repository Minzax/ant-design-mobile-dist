"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollapsePanel = exports.Collapse = void 0;

var _react = _interopRequireWildcard(require("react"));

var _nativeProps = require("../../utils/native-props");

var _list = _interopRequireDefault(require("../list"));

var _antdMobileIcons = require("antd-mobile-icons");

var _classnames = _interopRequireDefault(require("classnames"));

var _web = require("@react-spring/web");

var _usePropsValue2 = require("../../utils/use-props-value");

var _ahooks = require("ahooks");

var _useShouldRender = require("../../utils/use-should-render");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var classPrefix = "adm-collapse";

var CollapsePanel = function CollapsePanel() {
  return null;
};

exports.CollapsePanel = CollapsePanel;

var CollapsePanelContent = function CollapsePanelContent(props) {
  var visible = props.visible;
  var innerRef = (0, _react.useRef)(null);
  var shouldRender = (0, _useShouldRender.useShouldRender)(visible, props.forceRender, props.destroyOnClose);

  var _useSpring = (0, _web.useSpring)(function () {
    return {
      from: {
        height: 0
      }
    };
  }),
      height = _useSpring[0].height,
      api = _useSpring[1];

  (0, _ahooks.useMount)(function () {
    if (!visible) return;
    var inner = innerRef.current;
    if (!inner) return;
    api.start({
      height: inner.offsetHeight,
      immediate: true
    });
  });
  (0, _ahooks.useUpdateLayoutEffect)(function () {
    var inner = innerRef.current;
    if (!inner) return;

    if (visible) {
      api.start({
        height: inner.offsetHeight
      });
    } else {
      api.start({
        height: inner.offsetHeight,
        immediate: true
      });
      api.start({
        height: 0
      });
    }
  }, [visible]);
  return /*#__PURE__*/_react["default"].createElement(_web.animated.div, {
    className: classPrefix + "-panel-content",
    style: {
      height: height.to(function (v) {
        if (height.idle && visible) {
          return 'auto';
        } else {
          return v;
        }
      })
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-panel-content-inner",
    ref: innerRef
  }, /*#__PURE__*/_react["default"].createElement(_list["default"].Item, null, shouldRender && props.children)));
};

var Collapse = function Collapse(props) {
  var _a;

  var panels = [];

  _react["default"].Children.forEach(props.children, function (child) {
    if (! /*#__PURE__*/_react["default"].isValidElement(child)) return;
    var key = child.key;
    if (typeof key !== 'string') return;
    panels.push(child);
  });

  var _usePropsValue = (0, _usePropsValue2.usePropsValue)(props.accordion ? {
    value: props.activeKey === undefined ? undefined : props.activeKey === null ? [] : [props.activeKey],
    defaultValue: props.defaultActiveKey === undefined || props.defaultActiveKey === null ? [] : [props.defaultActiveKey],
    onChange: function onChange(v) {
      var _a, _b;

      (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, (_b = v[0]) !== null && _b !== void 0 ? _b : null);
    }
  } : {
    value: props.activeKey,
    defaultValue: (_a = props.defaultActiveKey) !== null && _a !== void 0 ? _a : [],
    onChange: props.onChange
  }),
      activeKey = _usePropsValue[0],
      setActiveKey = _usePropsValue[1];

  var activeKeyList = activeKey === null ? [] : Array.isArray(activeKey) ? activeKey : [activeKey];
  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix
  }, /*#__PURE__*/_react["default"].createElement(_list["default"], null, panels.map(function (panel) {
    var _classNames2;

    var key = panel.key;
    var active = activeKeyList.includes(key);

    function handleClick(event) {
      var _a, _b;

      if (props.accordion) {
        if (active) {
          setActiveKey([]);
        } else {
          setActiveKey([key]);
        }
      } else {
        if (active) {
          setActiveKey(activeKeyList.filter(function (v) {
            return v !== key;
          }));
        } else {
          setActiveKey([].concat(activeKeyList, [key]));
        }
      }

      (_b = (_a = panel.props).onClick) === null || _b === void 0 ? void 0 : _b.call(_a, event);
    }

    var renderArrow = function renderArrow() {
      var _classNames;

      var arrow = /*#__PURE__*/_react["default"].createElement(_antdMobileIcons.DownOutline, null);

      if (props.arrow !== undefined) {
        arrow = props.arrow;
      }

      if (panel.props.arrow !== undefined) {
        arrow = panel.props.arrow;
      }

      return typeof arrow === 'function' ? arrow(active) : /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(classPrefix + "-arrow", (_classNames = {}, _classNames[classPrefix + "-arrow-active"] = active, _classNames))
      }, arrow);
    };

    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, {
      key: key
    }, (0, _nativeProps.withNativeProps)(panel.props, /*#__PURE__*/_react["default"].createElement(_list["default"].Item, {
      className: (0, _classnames["default"])(classPrefix + "-panel-header", (_classNames2 = {}, _classNames2[classPrefix + "-panel-header-disabled"] = panel.props.disabled, _classNames2)),
      onClick: panel.props.disabled ? undefined : handleClick,
      arrow: renderArrow()
    }, panel.props.title)), /*#__PURE__*/_react["default"].createElement(CollapsePanelContent, {
      visible: active,
      forceRender: !!panel.props.forceRender,
      destroyOnClose: !!panel.props.destroyOnClose
    }, panel.props.children));
  }))));
};

exports.Collapse = Collapse;