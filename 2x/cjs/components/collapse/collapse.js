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

var _usePropsValue = require("../../utils/use-props-value");

var _ahooks = require("ahooks");

var _shouldRender = require("../../utils/should-render");

var _useIsomorphicUpdateLayoutEffect = require("../../utils/use-isomorphic-update-layout-effect");

var _traverseReactNode = require("../../utils/traverse-react-node");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const classPrefix = `adm-collapse`;

const CollapsePanel = () => {
  return null;
};

exports.CollapsePanel = CollapsePanel;

const CollapsePanelContent = props => {
  const {
    visible
  } = props;
  const innerRef = (0, _react.useRef)(null);
  const shouldRender = (0, _shouldRender.useShouldRender)(visible, props.forceRender, props.destroyOnClose);
  const [{
    height
  }, api] = (0, _web.useSpring)(() => ({
    from: {
      height: 0
    },
    config: {
      precision: 0.01,
      mass: 1,
      tension: 200,
      friction: 25,
      clamp: true
    }
  }));
  (0, _ahooks.useMount)(() => {
    if (!visible) return;
    const inner = innerRef.current;
    if (!inner) return;
    api.start({
      height: inner.offsetHeight,
      immediate: true
    });
  });
  (0, _useIsomorphicUpdateLayoutEffect.useIsomorphicUpdateLayoutEffect)(() => {
    const inner = innerRef.current;
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
  return _react.default.createElement(_web.animated.div, {
    className: `${classPrefix}-panel-content`,
    style: {
      height: height.to(v => {
        if (height.idle && visible) {
          return 'auto';
        } else {
          return v;
        }
      })
    }
  }, _react.default.createElement("div", {
    className: `${classPrefix}-panel-content-inner`,
    ref: innerRef
  }, _react.default.createElement(_list.default.Item, null, shouldRender && props.children)));
};

const Collapse = props => {
  var _a;

  const panels = [];
  (0, _traverseReactNode.traverseReactNode)(props.children, child => {
    if (!_react.default.isValidElement(child)) return;
    const key = child.key;
    if (typeof key !== 'string') return;
    panels.push(child);
  });
  const [activeKey, setActiveKey] = (0, _usePropsValue.usePropsValue)(props.accordion ? {
    value: props.activeKey === undefined ? undefined : props.activeKey === null ? [] : [props.activeKey],
    defaultValue: props.defaultActiveKey === undefined || props.defaultActiveKey === null ? [] : [props.defaultActiveKey],
    onChange: v => {
      var _a, _b;

      (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, (_b = v[0]) !== null && _b !== void 0 ? _b : null);
    }
  } : {
    value: props.activeKey,
    defaultValue: (_a = props.defaultActiveKey) !== null && _a !== void 0 ? _a : [],
    onChange: props.onChange
  });
  const activeKeyList = activeKey === null ? [] : Array.isArray(activeKey) ? activeKey : [activeKey];
  return (0, _nativeProps.withNativeProps)(props, _react.default.createElement("div", {
    className: classPrefix
  }, _react.default.createElement(_list.default, null, panels.map(panel => {
    const key = panel.key;
    const active = activeKeyList.includes(key);

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
          setActiveKey(activeKeyList.filter(v => v !== key));
        } else {
          setActiveKey([...activeKeyList, key]);
        }
      }

      (_b = (_a = panel.props).onClick) === null || _b === void 0 ? void 0 : _b.call(_a, event);
    }

    const renderArrow = () => {
      let arrow = _react.default.createElement(_antdMobileIcons.DownOutline, null);

      if (props.arrow !== undefined) {
        arrow = props.arrow;
      }

      if (panel.props.arrow !== undefined) {
        arrow = panel.props.arrow;
      }

      return typeof arrow === 'function' ? arrow(active) : _react.default.createElement("div", {
        className: (0, _classnames.default)(`${classPrefix}-arrow`, {
          [`${classPrefix}-arrow-active`]: active
        })
      }, arrow);
    };

    return _react.default.createElement(_react.default.Fragment, {
      key: key
    }, (0, _nativeProps.withNativeProps)(panel.props, _react.default.createElement(_list.default.Item, {
      className: `${classPrefix}-panel-header`,
      onClick: handleClick,
      disabled: panel.props.disabled,
      arrow: renderArrow()
    }, panel.props.title)), _react.default.createElement(CollapsePanelContent, {
      visible: active,
      forceRender: !!panel.props.forceRender,
      destroyOnClose: !!panel.props.destroyOnClose
    }, panel.props.children));
  }))));
};

exports.Collapse = Collapse;