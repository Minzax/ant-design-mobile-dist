import React, { useRef, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { useSpring, animated } from '@react-spring/web';
import { withNativeProps } from '../../utils/native-props';
import { usePropsValue } from '../../utils/use-props-value';
import { bound } from '../../utils/bound';
import { useUpdateLayoutEffect, useThrottleFn } from 'ahooks';
import { useMutationEffect } from '../../utils/use-mutation-effect';
import { useResizeEffect } from '../../utils/use-resize-effect';
import { mergeProps } from '../../utils/with-default-props';
var classPrefix = "adm-tabs";
export var Tab = function Tab() {
  return null;
};
var defaultProps = {
  activeLineMode: 'auto',
  stretch: true
};
export var Tabs = function Tabs(p) {
  var _a;

  var props = mergeProps(defaultProps, p);
  var tabListContainerRef = useRef(null);
  var activeLineRef = useRef(null);
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

  var _useSpring = useSpring(function () {
    return {
      x: 0,
      width: 0,
      config: {
        tension: 300,
        clamp: true
      }
    };
  }),
      _useSpring$ = _useSpring[0],
      x = _useSpring$.x,
      width = _useSpring$.width,
      api = _useSpring[1];

  var _useSpring2 = useSpring(function () {
    return {
      scrollLeft: 0,
      config: {
        tension: 300,
        clamp: true
      }
    };
  }),
      scrollLeft = _useSpring2[0].scrollLeft,
      scrollApi = _useSpring2[1];

  var _useSpring3 = useSpring(function () {
    return {
      leftMaskOpacity: 0,
      rightMaskOpacity: 0,
      config: {
        clamp: true
      }
    };
  }),
      _useSpring3$ = _useSpring3[0],
      leftMaskOpacity = _useSpring3$.leftMaskOpacity,
      rightMaskOpacity = _useSpring3$.rightMaskOpacity,
      maskApi = _useSpring3[1];

  function animate(immediate) {
    if (immediate === void 0) {
      immediate = false;
    }

    var container = tabListContainerRef.current;
    if (!container) return;
    var activeIndex = keyToIndexRecord[activeKey];

    if (activeIndex === undefined) {
      api.start({
        x: 0,
        width: 0,
        immediate: true
      });
      return;
    }

    var activeLine = activeLineRef.current;
    if (!activeLine) return;
    var activeTabWrapper = container.children.item(activeIndex + 1);
    var activeTab = activeTabWrapper.children.item(0);
    var activeTabLeft = activeTab.offsetLeft;
    var activeTabWidth = activeTab.offsetWidth;
    var activeTabWrapperLeft = activeTabWrapper.offsetLeft;
    var activeTabWrapperWidth = activeTabWrapper.offsetWidth;
    var containerWidth = container.offsetWidth;
    var containerScrollWidth = container.scrollWidth;
    var containerScrollLeft = container.scrollLeft;
    var activeLineWidth = activeLine.offsetWidth;
    var x = 0;
    var width = 0;

    if (props.activeLineMode === 'auto') {
      x = activeTabLeft;
      width = activeTabWidth;
    } else if (props.activeLineMode === 'full') {
      x = activeTabWrapperLeft;
      width = activeTabWrapperWidth;
    } else {
      x = activeTabLeft + (activeTabWidth - activeLineWidth) / 2;
    }

    api.start({
      x: x,
      width: width,
      immediate: immediate
    });
    var maxScrollDistance = containerScrollWidth - containerWidth;
    if (maxScrollDistance <= 0) return;
    var nextScrollLeft = bound(activeTabLeft - (containerWidth - activeTabWidth) / 2, 0, containerScrollWidth - containerWidth);
    scrollApi.start({
      scrollLeft: nextScrollLeft,
      from: {
        scrollLeft: containerScrollLeft
      },
      immediate: immediate
    });
  }

  useLayoutEffect(function () {
    animate(true);
  }, []);
  useUpdateLayoutEffect(function () {
    animate();
  }, [activeKey]);
  useResizeEffect(function () {
    animate(true);
  }, tabListContainerRef);
  useMutationEffect(function () {
    animate(true);
  }, tabListContainerRef, {
    subtree: true,
    childList: true,
    characterData: true
  });

  var _useThrottleFn = useThrottleFn(function (immediate) {
    if (immediate === void 0) {
      immediate = false;
    }

    var container = tabListContainerRef.current;
    if (!container) return;
    var scrollLeft = container.scrollLeft;
    var showLeftMask = scrollLeft > 0;
    var showRightMask = scrollLeft + container.offsetWidth < container.scrollWidth;
    maskApi.start({
      leftMaskOpacity: showLeftMask ? 1 : 0,
      rightMaskOpacity: showRightMask ? 1 : 0,
      immediate: immediate
    });
  }, {
    wait: 100,
    trailing: true,
    leading: true
  }),
      updateMask = _useThrottleFn.run;

  useLayoutEffect(function () {
    updateMask(true);
  }, []);
  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classPrefix
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-header"
  }, /*#__PURE__*/React.createElement(animated.div, {
    className: classNames(classPrefix + "-header-mask", classPrefix + "-header-mask-left"),
    style: {
      opacity: leftMaskOpacity
    }
  }), /*#__PURE__*/React.createElement(animated.div, {
    className: classNames(classPrefix + "-header-mask", classPrefix + "-header-mask-right"),
    style: {
      opacity: rightMaskOpacity
    }
  }), /*#__PURE__*/React.createElement(animated.div, {
    className: classPrefix + "-tab-list",
    ref: tabListContainerRef,
    scrollLeft: scrollLeft,
    onScroll: updateMask
  }, /*#__PURE__*/React.createElement(animated.div, {
    ref: activeLineRef,
    className: classPrefix + "-tab-line",
    style: {
      width: props.activeLineMode === 'fixed' ? 'var(--fixed-active-line-width, 30px)' : width,
      x: x
    }
  }), panes.map(function (pane) {
    var _classNames, _classNames2;

    return withNativeProps(pane.props, /*#__PURE__*/React.createElement("div", {
      key: pane.key,
      className: classNames(classPrefix + "-tab-wrapper", (_classNames = {}, _classNames[classPrefix + "-tab-wrapper-stretch"] = props.stretch, _classNames))
    }, /*#__PURE__*/React.createElement("div", {
      onClick: function onClick() {
        var key = pane.key;
        if (pane.props.disabled) return;

        if (key === undefined || key === null) {
          return;
        }

        setActiveKey(key.toString());
      },
      className: classNames(classPrefix + "-tab", (_classNames2 = {}, _classNames2[classPrefix + "-tab-active"] = pane.key === activeKey, _classNames2[classPrefix + "-tab-disabled"] = pane.props.disabled, _classNames2))
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