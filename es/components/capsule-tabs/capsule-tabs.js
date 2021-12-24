import React, { useRef } from 'react';
import classNames from 'classnames';
import { animated } from '@react-spring/web';
import { withNativeProps } from '../../utils/native-props';
import { usePropsValue } from '../../utils/use-props-value';
import { useResizeEffect } from '../../utils/use-resize-effect';
import { useTabListScroll } from '../../utils/use-tab-list-scroll';
import ScrollMask from '../scroll-mask';
var classPrefix = "adm-capsule-tabs";
export var CapsuleTab = function CapsuleTab() {
  return null;
};
export var CapsuleTabs = function CapsuleTabs(props) {
  var _a;

  var tabListContainerRef = useRef(null);
  var rootRef = useRef(null);
  var keyToIndexRecord = {};
  var firstActiveKey = null;
  var panes = [];
  React.Children.forEach(props.children, function (child, index) {
    if (! /*#__PURE__*/React.isValidElement(child)) return;
    var key = child.key;
    if (typeof key !== 'string') return;

    if (index === 0) {
      firstActiveKey = key;
    }

    var length = panes.push(child);
    keyToIndexRecord[key] = length - 1;
  });

  var _usePropsValue = usePropsValue({
    value: props.activeKey,
    defaultValue: (_a = props.defaultActiveKey) !== null && _a !== void 0 ? _a : firstActiveKey,
    onChange: props.onChange
  }),
      activeKey = _usePropsValue[0],
      setActiveKey = _usePropsValue[1];

  var _useTabListScroll = useTabListScroll(tabListContainerRef, keyToIndexRecord[activeKey]),
      scrollLeft = _useTabListScroll.scrollLeft,
      animate = _useTabListScroll.animate;

  useResizeEffect(function () {
    animate(true);
  }, rootRef);
  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classPrefix,
    ref: rootRef
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-header"
  }, /*#__PURE__*/React.createElement(ScrollMask, {
    scrollTrackRef: tabListContainerRef
  }), /*#__PURE__*/React.createElement(animated.div, {
    className: classPrefix + "-tab-list",
    ref: tabListContainerRef,
    scrollLeft: scrollLeft
  }, panes.map(function (pane) {
    var _classNames;

    return withNativeProps(pane.props, /*#__PURE__*/React.createElement("div", {
      key: pane.key,
      className: classPrefix + "-tab-wrapper"
    }, /*#__PURE__*/React.createElement("div", {
      onClick: function onClick() {
        var key = pane.key;
        if (pane.props.disabled) return;

        if (key === undefined || key === null) {
          return;
        }

        setActiveKey(key.toString());
      },
      className: classNames(classPrefix + "-tab", (_classNames = {}, _classNames[classPrefix + "-tab-active"] = pane.key === activeKey, _classNames[classPrefix + "-tab-disabled"] = pane.props.disabled, _classNames))
    }, pane.props.title)));
  }))), panes.map(function (pane) {
    if (pane.props.children === undefined) {
      return null;
    }

    if (pane.key === activeKey) {
      return /*#__PURE__*/React.createElement("div", {
        key: pane.key,
        className: classPrefix + "-content"
      }, pane.props.children);
    }

    if (pane.props.forceRender) {
      return /*#__PURE__*/React.createElement("div", {
        key: pane.key,
        style: {
          display: 'none'
        }
      }, pane.props.children);
    }

    return null;
  })));
};