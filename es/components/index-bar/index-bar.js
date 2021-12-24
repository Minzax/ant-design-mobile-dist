import React, { forwardRef, useRef, useState, useImperativeHandle } from 'react';
import classNames from 'classnames';
import { withNativeProps } from '../../utils/native-props';
import { useThrottleFn } from 'ahooks';
import { mergeProps } from '../../utils/with-default-props';
import { Sidebar } from './sidebar';
import { convertPx } from '../../utils/convert-px';
import { Panel } from './panel';
import { devWarning } from '../../utils/dev-log';
var classPrefix = "adm-index-bar";
var defaultProps = {
  sticky: true
};
export var IndexBar = /*#__PURE__*/forwardRef(function (p, ref) {
  var _classNames;

  var props = mergeProps(defaultProps, p);
  var titleHeight = convertPx(35);
  var bodyRef = useRef(null);
  var indexes = [];
  var panels = [];
  React.Children.forEach(props.children, function (child) {
    if (! /*#__PURE__*/React.isValidElement(child)) return;

    if (child.type !== Panel) {
      devWarning('IndexBar', 'The children of `IndexBar` must be `IndexBar.Panel` components.');
      return;
    }

    indexes.push(child.props.index);
    panels.push(withNativeProps(child.props, /*#__PURE__*/React.createElement("div", {
      key: child.props.index,
      "data-index": child.props.index,
      className: classPrefix + "-anchor"
    }, /*#__PURE__*/React.createElement("div", {
      className: classPrefix + "-anchor-title"
    }, child.props.title || child.props.index), child.props.children)));
  });

  var _useState = useState(indexes[0]),
      activeIndex = _useState[0],
      setActiveIndex = _useState[1];

  useImperativeHandle(ref, function () {
    return {
      scrollTo: scrollTo
    };
  });

  function scrollTo(index) {
    var body = bodyRef.current;
    if (!body) return;
    var children = body.children;

    for (var i = 0; i < children.length; i++) {
      var panel = children.item(i);
      if (!panel) continue;
      var panelIndex = panel.dataset['index'];

      if (panelIndex === index) {
        body.scrollTop = panel.offsetTop;
        setActiveIndex(index);
        return;
      }
    }
  }

  var _useThrottleFn = useThrottleFn(function () {
    var body = bodyRef.current;
    if (!body) return;
    var scrollTop = body.scrollTop;
    var elements = body.getElementsByClassName(classPrefix + "-anchor");

    for (var i = 0; i < elements.length; i++) {
      var panel = elements.item(i);
      if (!panel) continue;
      var panelIndex = panel.dataset['index'];
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
  }),
      checkActiveIndex = _useThrottleFn.run;

  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classNames("" + classPrefix, (_classNames = {}, _classNames[classPrefix + "-sticky"] = props.sticky, _classNames))
  }, /*#__PURE__*/React.createElement(Sidebar, {
    indexes: indexes,
    activeIndex: activeIndex,
    onActive: function onActive(index) {
      scrollTo(index);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-body",
    ref: bodyRef,
    onScroll: checkActiveIndex
  }, panels)));
});