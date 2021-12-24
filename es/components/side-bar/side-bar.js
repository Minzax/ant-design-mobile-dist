import React from 'react';
import classNames from 'classnames';
import Badge from '../badge';
import { withNativeProps } from '../../utils/native-props';
import { usePropsValue } from '../../utils/use-props-value';
var classPrefix = "adm-side-bar";
export var SideBarItem = function SideBarItem() {
  return null;
};
export var SideBar = function SideBar(props) {
  var _a;

  var firstActiveKey = null;
  var items = [];
  React.Children.forEach(props.children, function (child, index) {
    if (! /*#__PURE__*/React.isValidElement(child)) return;
    var key = child.key;
    if (typeof key !== 'string') return;

    if (index === 0) {
      firstActiveKey = key;
    }

    items.push(child);
  });

  var _usePropsValue = usePropsValue({
    value: props.activeKey,
    defaultValue: (_a = props.defaultActiveKey) !== null && _a !== void 0 ? _a : firstActiveKey,
    onChange: props.onChange
  }),
      activeKey = _usePropsValue[0],
      setActiveKey = _usePropsValue[1];

  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classNames(classPrefix)
  }, items.map(function (item) {
    var _classNames;

    var active = item.key === activeKey;
    return withNativeProps(item.props, /*#__PURE__*/React.createElement("div", {
      key: item.key,
      onClick: function onClick() {
        var key = item.key;
        if (key === undefined || key === null || item.props.disabled) return;
        setActiveKey(key.toString());
      },
      className: classNames(classPrefix + "-item", (_classNames = {}, _classNames[classPrefix + "-item-active"] = active, _classNames[classPrefix + "-item-disabled"] = item.props.disabled, _classNames))
    }, /*#__PURE__*/React.createElement(Badge, {
      content: item.props.badge
    }, /*#__PURE__*/React.createElement("div", {
      className: classPrefix + "-item-title"
    }, item.props.title))));
  })));
};