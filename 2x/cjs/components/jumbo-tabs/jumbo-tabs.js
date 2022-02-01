"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JumboTabs = exports.JumboTab = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _web = require("@react-spring/web");

var _nativeProps = require("../../utils/native-props");

var _usePropsValue = require("../../utils/use-props-value");

var _useResizeEffect = require("../../utils/use-resize-effect");

var _useTabListScroll = require("../../utils/use-tab-list-scroll");

var _scrollMask = _interopRequireDefault(require("../scroll-mask"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const classPrefix = `adm-jumbo-tabs`;

const JumboTab = () => {
  return null;
};

exports.JumboTab = JumboTab;

const JumboTabs = props => {
  var _a;

  const tabListContainerRef = (0, _react.useRef)(null);
  const rootRef = (0, _react.useRef)(null);
  const keyToIndexRecord = {};
  let firstActiveKey = null;
  const panes = [];

  _react.default.Children.forEach(props.children, (child, index) => {
    if (!_react.default.isValidElement(child)) return;
    const key = child.key;
    if (typeof key !== 'string') return;

    if (index === 0) {
      firstActiveKey = key;
    }

    const length = panes.push(child);
    keyToIndexRecord[key] = length - 1;
  });

  const [activeKey, setActiveKey] = (0, _usePropsValue.usePropsValue)({
    value: props.activeKey,
    defaultValue: (_a = props.defaultActiveKey) !== null && _a !== void 0 ? _a : firstActiveKey,
    onChange: v => {
      var _a;

      if (v === null) return;
      (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, v);
    }
  });
  const {
    scrollLeft,
    animate
  } = (0, _useTabListScroll.useTabListScroll)(tabListContainerRef, keyToIndexRecord[activeKey]);
  (0, _useResizeEffect.useResizeEffect)(() => {
    animate(true);
  }, rootRef);
  return (0, _nativeProps.withNativeProps)(props, _react.default.createElement("div", {
    className: classPrefix,
    ref: rootRef
  }, _react.default.createElement("div", {
    className: `${classPrefix}-header`
  }, _react.default.createElement(_scrollMask.default, {
    scrollTrackRef: tabListContainerRef
  }), _react.default.createElement(_web.animated.div, {
    className: `${classPrefix}-tab-list`,
    ref: tabListContainerRef,
    scrollLeft: scrollLeft
  }, panes.map(pane => (0, _nativeProps.withNativeProps)(pane.props, _react.default.createElement("div", {
    key: pane.key,
    className: `${classPrefix}-tab-wrapper`
  }, _react.default.createElement("div", {
    onClick: () => {
      const {
        key
      } = pane;
      if (pane.props.disabled) return;

      if (key === undefined || key === null) {
        return;
      }

      setActiveKey(key.toString());
    },
    className: (0, _classnames.default)(`${classPrefix}-tab`, {
      [`${classPrefix}-tab-active`]: pane.key === activeKey,
      [`${classPrefix}-tab-disabled`]: pane.props.disabled
    })
  }, _react.default.createElement("div", {
    className: `${classPrefix}-tab-title`
  }, pane.props.title), _react.default.createElement("div", {
    className: `${classPrefix}-tab-description`
  }, pane.props.description))))))), panes.map(pane => {
    if (pane.props.children === undefined) {
      return null;
    }

    if (pane.key === activeKey) {
      return _react.default.createElement("div", {
        key: pane.key,
        className: `${classPrefix}-content`
      }, pane.props.children);
    }

    if (pane.props.forceRender) {
      return _react.default.createElement("div", {
        key: pane.key,
        style: {
          display: 'none'
        }
      }, pane.props.children);
    }

    return null;
  })));
};

exports.JumboTabs = JumboTabs;