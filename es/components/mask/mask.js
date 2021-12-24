import { withNativeProps } from '../../utils/native-props';
import React, { useMemo, useRef, useState } from 'react';
import { useUnmountedRef } from 'ahooks';
import { useLockScroll } from '../../utils/use-lock-scroll';
import { useSpring, animated } from '@react-spring/web';
import { renderToContainer } from '../../utils/render-to-container';
import { mergeProps } from '../../utils/with-default-props';
import { useConfig } from '../config-provider';
import { useShouldRender } from '../../utils/use-should-render';
import { withStopPropagation } from '../../utils/with-stop-propagation';
var classPrefix = "adm-mask";
var opacityRecord = {
  "default": 0.55,
  thin: 0.35,
  thick: 0.75
};
var defaultProps = {
  visible: true,
  destroyOnClose: false,
  forceRender: false,
  color: 'black',
  opacity: 'default',
  disableBodyScroll: true,
  getContainer: null,
  stopPropagation: ['click']
};
export var Mask = function Mask(p) {
  var props = mergeProps(defaultProps, p);

  var _useConfig = useConfig(),
      locale = _useConfig.locale;

  var ref = useRef(null);
  useLockScroll(ref, props.visible && props.disableBodyScroll);
  var background = useMemo(function () {
    var _a;

    var opacity = (_a = opacityRecord[props.opacity]) !== null && _a !== void 0 ? _a : props.opacity;
    var rgb = props.color === 'white' ? '255, 255, 255' : '0, 0, 0';
    return "rgba(" + rgb + ", " + opacity + ")";
  }, [props.color, props.opacity]);

  var _useState = useState(props.visible),
      active = _useState[0],
      setActive = _useState[1];

  var unmountedRef = useUnmountedRef();

  var _useSpring = useSpring({
    opacity: props.visible ? 1 : 0,
    config: {
      precision: 0.01,
      mass: 1,
      tension: 200,
      friction: 30,
      clamp: true
    },
    onStart: function onStart() {
      setActive(true);
    },
    onRest: function onRest() {
      var _a, _b;

      if (unmountedRef.current) return;
      setActive(props.visible);

      if (props.visible) {
        (_a = props.afterShow) === null || _a === void 0 ? void 0 : _a.call(props);
      } else {
        (_b = props.afterClose) === null || _b === void 0 ? void 0 : _b.call(props);
      }
    }
  }),
      opacity = _useSpring.opacity;

  var shouldRender = useShouldRender(active, props.forceRender, props.destroyOnClose);
  var node = withStopPropagation(props.stopPropagation, withNativeProps(props, /*#__PURE__*/React.createElement(animated.div, {
    className: classPrefix,
    ref: ref,
    style: Object.assign(Object.assign({}, props.style), {
      background: background,
      opacity: opacity,
      display: active ? 'unset' : 'none'
    })
  }, props.onMaskClick && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-aria-button",
    role: 'button',
    "aria-label": locale.Mask.name,
    onClick: props.onMaskClick
  }), /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-content"
  }, shouldRender && props.children))));
  return renderToContainer(props.getContainer, node);
};