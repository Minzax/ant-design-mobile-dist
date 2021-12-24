import React, { useRef } from 'react';
import { withNativeProps } from '../../utils/native-props';
import List from '../list';
import { RightOutline } from 'antd-mobile-icons';
import classNames from 'classnames';
import { useSpring, animated } from '@react-spring/web';
import { usePropsValue } from '../../utils/use-props-value';
import { useMount, useUpdateLayoutEffect } from 'ahooks';
import { useShouldRender } from '../../utils/use-should-render';
var classPrefix = "adm-collapse";
export var CollapsePanel = function CollapsePanel() {
  return null;
};

var CollapsePanelContent = function CollapsePanelContent(props) {
  var visible = props.visible;
  var innerRef = useRef(null);
  var shouldRender = useShouldRender(visible, props.forceRender, props.destroyOnClose);

  var _useSpring = useSpring(function () {
    return {
      from: {
        height: 0
      }
    };
  }),
      height = _useSpring[0].height,
      api = _useSpring[1];

  useMount(function () {
    if (!visible) return;
    var inner = innerRef.current;
    if (!inner) return;
    api.start({
      height: inner.offsetHeight,
      immediate: true
    });
  });
  useUpdateLayoutEffect(function () {
    var inner = innerRef.current;
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
  return /*#__PURE__*/React.createElement(animated.div, {
    className: classPrefix + "-panel-content",
    style: {
      height: height.to(function (v) {
        if (height.idle && visible) {
          return 'auto';
        } else {
          return v;
        }
      })
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-panel-content-inner",
    ref: innerRef
  }, /*#__PURE__*/React.createElement(List.Item, null, shouldRender && props.children)));
};

export var Collapse = function Collapse(props) {
  var _a;

  var panels = [];
  React.Children.forEach(props.children, function (child) {
    if (! /*#__PURE__*/React.isValidElement(child)) return;
    var key = child.key;
    if (typeof key !== 'string') return;
    panels.push(child);
  });

  var _usePropsValue = usePropsValue(props.accordion ? {
    value: props.activeKey === undefined ? undefined : props.activeKey === null ? [] : [props.activeKey],
    defaultValue: props.defaultActiveKey === undefined || props.defaultActiveKey === null ? [] : [props.defaultActiveKey],
    onChange: function onChange(v) {
      var _a, _b;

      (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, (_b = v[0]) !== null && _b !== void 0 ? _b : null);
    }
  } : {
    value: props.activeKey,
    defaultValue: (_a = props.defaultActiveKey) !== null && _a !== void 0 ? _a : [],
    onChange: props.onChange
  }),
      activeKey = _usePropsValue[0],
      setActiveKey = _usePropsValue[1];

  var activeKeyList = activeKey === null ? [] : Array.isArray(activeKey) ? activeKey : [activeKey];
  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classPrefix
  }, /*#__PURE__*/React.createElement(List, null, panels.map(function (panel) {
    var _classNames2;

    var key = panel.key;
    var active = activeKeyList.includes(key);

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
          setActiveKey(activeKeyList.filter(function (v) {
            return v !== key;
          }));
        } else {
          setActiveKey([].concat(activeKeyList, [key]));
        }
      }

      (_b = (_a = panel.props).onClick) === null || _b === void 0 ? void 0 : _b.call(_a, event);
    }

    var renderArrow = function renderArrow() {
      var _classNames;

      var arrow = /*#__PURE__*/React.createElement(RightOutline, null);

      if (props.arrow !== undefined) {
        arrow = props.arrow;
      }

      if (panel.props.arrow !== undefined) {
        arrow = panel.props.arrow;
      }

      return typeof arrow === 'function' ? arrow(active) : /*#__PURE__*/React.createElement("div", {
        className: classNames(classPrefix + "-arrow", (_classNames = {}, _classNames[classPrefix + "-arrow-active"] = active, _classNames))
      }, arrow);
    };

    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: key
    }, withNativeProps(panel.props, /*#__PURE__*/React.createElement(List.Item, {
      className: classNames(classPrefix + "-panel-header", (_classNames2 = {}, _classNames2[classPrefix + "-panel-header-disabled"] = panel.props.disabled, _classNames2)),
      onClick: panel.props.disabled ? undefined : handleClick,
      arrow: renderArrow()
    }, panel.props.title)), /*#__PURE__*/React.createElement(CollapsePanelContent, {
      visible: active,
      forceRender: !!panel.props.forceRender,
      destroyOnClose: !!panel.props.destroyOnClose
    }, panel.props.children));
  }))));
};