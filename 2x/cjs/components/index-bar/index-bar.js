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

var _traverseReactNode = require("../../utils/traverse-react-node");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const classPrefix = `adm-index-bar`;
const defaultProps = {
  sticky: true
};
const IndexBar = (0, _react.forwardRef)((p, ref) => {
  const props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  const titleHeight = (0, _convertPx.convertPx)(35);
  const bodyRef = (0, _react.useRef)(null);
  const indexItems = [];
  const panels = [];
  (0, _traverseReactNode.traverseReactNode)(props.children, child => {
    var _a;

    if (!_react.default.isValidElement(child)) return;

    if (child.type !== _panel.Panel) {
      (0, _devLog.devWarning)('IndexBar', 'The children of `IndexBar` must be `IndexBar.Panel` components.');
      return;
    }

    indexItems.push({
      index: child.props.index,
      brief: (_a = child.props.brief) !== null && _a !== void 0 ? _a : child.props.index.charAt(0)
    });
    panels.push((0, _nativeProps.withNativeProps)(child.props, _react.default.createElement("div", {
      key: child.props.index,
      "data-index": child.props.index,
      className: `${classPrefix}-anchor`
    }, _react.default.createElement("div", {
      className: `${classPrefix}-anchor-title`
    }, child.props.title || child.props.index), child.props.children)));
  });
  const [activeIndex, setActiveIndex] = (0, _react.useState)(() => {
    const firstItem = indexItems[0];
    return firstItem ? firstItem.index : null;
  });
  (0, _react.useImperativeHandle)(ref, () => ({
    scrollTo
  }));

  function scrollTo(index) {
    const body = bodyRef.current;
    if (!body) return;
    const children = body.children;

    for (let i = 0; i < children.length; i++) {
      const panel = children.item(i);
      if (!panel) continue;
      const panelIndex = panel.dataset['index'];

      if (panelIndex === index) {
        body.scrollTop = panel.offsetTop;
        setActiveIndex(index);
        return;
      }
    }
  }

  const {
    run: checkActiveIndex
  } = (0, _ahooks.useThrottleFn)(() => {
    const body = bodyRef.current;
    if (!body) return;
    const scrollTop = body.scrollTop;
    const elements = body.getElementsByClassName(`${classPrefix}-anchor`);

    for (let i = 0; i < elements.length; i++) {
      const panel = elements.item(i);
      if (!panel) continue;
      const panelIndex = panel.dataset['index'];
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
  });
  return (0, _nativeProps.withNativeProps)(props, _react.default.createElement("div", {
    className: (0, _classnames.default)(`${classPrefix}`, {
      [`${classPrefix}-sticky`]: props.sticky
    })
  }, _react.default.createElement(_sidebar.Sidebar, {
    indexItems: indexItems,
    activeIndex: activeIndex,
    onActive: index => {
      scrollTo(index);
    }
  }), _react.default.createElement("div", {
    className: `${classPrefix}-body`,
    ref: bodyRef,
    onScroll: checkActiveIndex
  }, panels)));
});
exports.IndexBar = IndexBar;