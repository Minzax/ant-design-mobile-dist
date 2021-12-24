import React from 'react';
import classNames from 'classnames';
import { withNativeProps } from '../../utils/native-props';
import Badge from '../badge';
import { usePropsValue } from '../../utils/use-props-value';
export var TabBarItem = function TabBarItem() {
  return null;
};
export var TabBar = function TabBar(props) {
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
    className: 'adm-tab-bar'
  }, items.map(function (item) {
    var active = item.key === activeKey;

    function renderContent() {
      var iconElement = item.props.icon && /*#__PURE__*/React.createElement("div", {
        className: 'adm-tab-bar-item-icon'
      }, typeof item.props.icon === 'function' ? item.props.icon(active) : item.props.icon);
      var titleElement = item.props.title && /*#__PURE__*/React.createElement("div", {
        className: 'adm-tab-bar-item-title'
      }, item.props.title);

      if (iconElement) {
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Badge, {
          content: item.props.badge,
          className: 'adm-tab-bar-icon-badge'
        }, iconElement), titleElement);
      } else if (titleElement) {
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Badge, {
          content: item.props.badge,
          className: 'adm-tab-bar-title-badge'
        }, titleElement));
      }

      return null;
    }

    return withNativeProps(item.props, /*#__PURE__*/React.createElement("div", {
      key: item.key,
      onClick: function onClick() {
        var key = item.key;
        if (key === undefined || key === null) return;
        setActiveKey(key.toString());
      },
      className: classNames('adm-tab-bar-item', {
        'adm-tab-bar-item-active': active
      })
    }, renderContent()));
  })));
};