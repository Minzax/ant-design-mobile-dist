"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexBar = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _nativeProps = require("../../utils/native-props");

var _ahooks = require("ahooks");

var _withDefaultProps = require("../../utils/with-default-props");

var _sidebar = require("./sidebar");

var _convertPx = require("../../utils/convert-px");

var _panel = require("./panel");

var _devLog = require("../../utils/dev-log");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var classPrefix = "adm-index-bar";
var defaultProps = {
  sticky: true
};
var IndexBar = /*#__PURE__*/(0, _react.forwardRef)(function (p, ref) {
  var _classNames;

  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  var titleHeight = (0, _convertPx.convertPx)(35);
  var bodyRef = (0, _react.useRef)(null);
  var indexes = [];
  var panels = [];

  _react["default"].Children.forEach(props.children, function (child) {
    if (! /*#__PURE__*/_react["default"].isValidElement(child)) return;

    if (child.type !== _panel.Panel) {
      (0, _devLog.devWarning)('IndexBar', 'The children of `IndexBar` must be `IndexBar.Panel` components.');
      return;
    }

    indexes.push(child.props.index);
    panels.push((0, _nativeProps.withNativeProps)(child.props, /*#__PURE__*/_react["default"].createElement("div", {
      key: child.props.index,
      "data-index": child.props.index,
      className: classPrefix + "-anchor"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: classPrefix + "-anchor-title"
    }, child.props.title || child.props.index), child.props.children)));
  });

  var _useState = (0, _react.useState)(indexes[0]),
      activeIndex = _useState[0],
      setActiveIndex = _useState[1];

  (0, _react.useImperativeHandle)(ref, function () {
    return {
      scrollTo: scrollTo
    };
  });

  function scrollTo(index) {
    var body = bodyRef.current;
    if (!body) return;
    var children = body.children;

    for (var i = 0; i < children.length; i++) {
      var panel = children.item(i);
      if (!panel) continue;
      var panelIndex = panel.dataset['index'];

      if (panelIndex === index) {
        body.scrollTop = panel.offsetTop;
        setActiveIndex(index);
        return;
      }
    }
  }

  var _useThrottleFn = (0, _ahooks.useThrottleFn)(function () {
    var body = bodyRef.current;
    if (!body) return;
    var scrollTop = body.scrollTop;
    var elements = body.getElementsByClassName(classPrefix + "-anchor");

    for (var i = 0; i < elements.length; i++) {
      var panel = elements.item(i);
      if (!panel) continue;
      var panelIndex = panel.dataset['index'];
      if (!panelIndex) continue;

      if (panel.offsetTop + panel.clientHeight - titleHeight > scrollTop) {
        setActiveIndex(panelIndex);
        return;
      }
    }
  }, {
    wait: 50,
    trailing: true,
    leading: true
  }),
      checkActiveIndex = _useThrottleFn.run;

  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])("" + classPrefix, (_classNames = {}, _classNames[classPrefix + "-sticky"] = props.sticky, _classNames))
  }, /*#__PURE__*/_react["default"].createElement(_sidebar.Sidebar, {
    indexes: indexes,
    activeIndex: activeIndex,
    onActive: function onActive(index) {
      scrollTo(index);
    }
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-body",
    ref: bodyRef,
    onScroll: checkActiveIndex
  }, panels)));
});
exports.IndexBar = IndexBar;