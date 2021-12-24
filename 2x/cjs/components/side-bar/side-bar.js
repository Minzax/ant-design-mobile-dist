"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SideBarItem = exports.SideBar = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _badge = _interopRequireDefault(require("../badge"));

var _nativeProps = require("../../utils/native-props");

var _usePropsValue2 = require("../../utils/use-props-value");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classPrefix = "adm-side-bar";

var SideBarItem = function SideBarItem() {
  return null;
};

exports.SideBarItem = SideBarItem;

var SideBar = function SideBar(props) {
  var _a;

  var firstActiveKey = null;
  var items = [];

  _react["default"].Children.forEach(props.children, function (child, index) {
    if (! /*#__PURE__*/_react["default"].isValidElement(child)) return;
    var key = child.key;
    if (typeof key !== 'string') return;

    if (index === 0) {
      firstActiveKey = key;
    }

    items.push(child);
  });

  var _usePropsValue = (0, _usePropsValue2.usePropsValue)({
    value: props.activeKey,
    defaultValue: (_a = props.defaultActiveKey) !== null && _a !== void 0 ? _a : firstActiveKey,
    onChange: props.onChange
  }),
      activeKey = _usePropsValue[0],
      setActiveKey = _usePropsValue[1];

  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(classPrefix)
  }, items.map(function (item) {
    var _classNames;

    var active = item.key === activeKey;
    return (0, _nativeProps.withNativeProps)(item.props, /*#__PURE__*/_react["default"].createElement("div", {
      key: item.key,
      onClick: function onClick() {
        var key = item.key;
        if (key === undefined || key === null || item.props.disabled) return;
        setActiveKey(key.toString());
      },
      className: (0, _classnames["default"])(classPrefix + "-item", (_classNames = {}, _classNames[classPrefix + "-item-active"] = active, _classNames[classPrefix + "-item-disabled"] = item.props.disabled, _classNames))
    }, /*#__PURE__*/_react["default"].createElement(_badge["default"], {
      content: item.props.badge
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: classPrefix + "-item-title"
    }, item.props.title))));
  })));
};

exports.SideBar = SideBar;