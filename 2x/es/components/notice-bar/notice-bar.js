import React, { useState, useRef, memo } from 'react';
import classNames from 'classnames';
import { CloseOutline, SoundOutline } from 'antd-mobile-icons';
import { useTimeout } from 'ahooks';
import { mergeProps } from '../../utils/with-default-props';
import { withNativeProps } from '../../utils/native-props';
import { useResizeEffect } from '../../utils/use-resize-effect';
import { useMutationEffect } from '../../utils/use-mutation-effect';
var classPrefix = "adm-notice-bar";
var defaultProps = {
  color: 'default',
  delay: 2000,
  speed: 50
};
export var NoticeBar = /*#__PURE__*/memo(function (p) {
  var props = mergeProps(defaultProps, p);
  var containerRef = useRef(null);
  var textRef = useRef(null);

  var _useState = useState(true),
      visible = _useState[0],
      setVisible = _useState[1];

  var speed = props.speed;
  var delayLockRef = useRef(true);
  var animatingRef = useRef(false);

  function start() {
    if (delayLockRef.current) return;
    var container = containerRef.current;
    var text = textRef.current;
    if (!container || !text) return;

    if (container.offsetWidth >= text.offsetWidth) {
      animatingRef.current = false;
      text.style.removeProperty('transition-duration');
      text.style.removeProperty('transform');
      return;
    }

    if (animatingRef.current) return;
    var initial = !text.style.transform;
    text.style.transitionDuration = '0s';

    if (initial) {
      text.style.transform = 'translateX(0)';
    } else {
      text.style.transform = "translateX(" + container.offsetWidth + "px)";
    }

    var distance = initial ? text.offsetWidth : container.offsetWidth + text.offsetWidth;
    animatingRef.current = true;
    text.style.transitionDuration = Math.round(distance / speed) + "s";
    text.style.transform = "translateX(-" + text.offsetWidth + "px)";
  }

  useTimeout(function () {
    delayLockRef.current = false;
    start();
  }, props.delay);
  useResizeEffect(function (text) {
    start();
  }, containerRef);
  useMutationEffect(function () {
    start();
  }, textRef, {
    subtree: true,
    childList: true,
    characterData: true
  });
  if (!visible) return null;
  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classNames(classPrefix, classPrefix + "-" + props.color)
  }, /*#__PURE__*/React.createElement("span", {
    className: classPrefix + "-left"
  }, 'icon' in props ? props.icon : /*#__PURE__*/React.createElement(SoundOutline, null)), /*#__PURE__*/React.createElement("span", {
    ref: containerRef,
    className: classPrefix + "-content"
  }, /*#__PURE__*/React.createElement("span", {
    onTransitionEnd: function onTransitionEnd() {
      animatingRef.current = false;
      start();
    },
    ref: textRef,
    className: classPrefix + "-content-inner"
  }, props.content)), (props.closeable || props.extra) && /*#__PURE__*/React.createElement("span", {
    className: classPrefix + "-right"
  }, props.extra, props.closeable && /*#__PURE__*/React.createElement(CloseOutline, {
    onClick: function onClick() {
      var _a;

      setVisible(false);
      (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
    }
  }))));
});