"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabBarItem = exports.TabBar = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _nativeProps = require("../../utils/native-props");

var _badge = _interopRequireDefault(require("../badge"));

var _usePropsValue2 = require("../../utils/use-props-value");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TabBarItem = function TabBarItem() {
  return null;
};

exports.TabBarItem = TabBarItem;

var TabBar = function TabBar(props) {
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
    className: 'adm-tab-bar'
  }, items.map(function (item) {
    var active = item.key === activeKey;

    function renderContent() {
      var iconElement = item.props.icon && /*#__PURE__*/_react["default"].createElement("div", {
        className: 'adm-tab-bar-item-icon'
      }, typeof item.props.icon === 'function' ? item.props.icon(active) : item.props.icon);

      var titleElement = item.props.title && /*#__PURE__*/_react["default"].createElement("div", {
        className: 'adm-tab-bar-item-title'
      }, item.props.title);

      if (iconElement) {
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_badge["default"], {
          content: item.props.badge,
          className: 'adm-tab-bar-icon-badge'
        }, iconElement), titleElement);
      } else if (titleElement) {
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_badge["default"], {
          content: item.props.badge,
          className: 'adm-tab-bar-title-badge'
        }, titleElement));
      }

      return null;
    }

    return (0, _nativeProps.withNativeProps)(item.props, /*#__PURE__*/_react["default"].createElement("div", {
      key: item.key,
      onClick: function onClick() {
        var key = item.key;
        if (key === undefined || key === null) return;
        setActiveKey(key.toString());
      },
      className: (0, _classnames["default"])('adm-tab-bar-item', {
        'adm-tab-bar-item-active': active
      })
    }, renderContent()));
  })));
};

exports.TabBar = TabBar;