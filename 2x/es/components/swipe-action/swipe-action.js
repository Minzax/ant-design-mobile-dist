import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { mergeProps } from '../../utils/with-default-props';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import Button from '../button';
import { nearest } from '../../utils/nearest';
import { withNativeProps } from '../../utils/native-props';
var defaultProps = {
  rightActions: [],
  leftActions: [],
  closeOnTouchOutside: true,
  closeOnAction: true
};
export var SwipeAction = /*#__PURE__*/forwardRef(function (p, ref) {
  var props = mergeProps(defaultProps, p);
  var rootRef = useRef(null);
  var leftRef = useRef(null);
  var rightRef = useRef(null);

  function getWidth(ref) {
    var element = ref.current;
    if (!element) return 0;
    return element.offsetWidth;
  }

  function getLeftWidth() {
    return getWidth(leftRef);
  }

  function getRightWidth() {
    return getWidth(rightRef);
  }

  var _useSpring = useSpring(function () {
    return {
      x: 0,
      config: {
        tension: 200,
        friction: 30
      }
    };
  }, []),
      x = _useSpring[0].x,
      api = _useSpring[1];

  var draggingRef = useRef(false);
  var bind = useDrag(function (state) {
    draggingRef.current = true;
    var _state$offset = state.offset,
        offsetX = _state$offset[0];

    if (state.last) {
      var leftWidth = getLeftWidth();
      var rightWidth = getRightWidth();
      var position = offsetX + state.velocity[0] * state.direction[0] * 50;

      if (offsetX > 0) {
        position = Math.max(0, position);
      } else if (offsetX < 0) {
        position = Math.min(0, position);
      } else {
        position = 0;
      }

      api.start({
        x: nearest([-rightWidth, 0, leftWidth], position)
      });
      window.setTimeout(function () {
        draggingRef.current = false;
      });
    } else {
      api.start({
        x: offsetX,
        immediate: true
      });
    }
  }, {
    from: function from() {
      return [x.get(), 0];
    },
    bounds: function bounds() {
      var leftWidth = getLeftWidth();
      var rightWidth = getRightWidth();
      return {
        left: -rightWidth,
        right: leftWidth
      };
    },
    // rubberband: true,
    axis: 'x',
    preventScroll: true,
    pointer: {
      touch: true
    }
  });

  function close() {
    api.start({
      x: 0
    });
  }

  useImperativeHandle(ref, function () {
    return {
      show: function show(side) {
        if (side === void 0) {
          side = 'right';
        }

        if (side === 'right') {
          api.start({
            x: -getRightWidth()
          });
        } else if (side === 'left') {
          api.start({
            x: getLeftWidth()
          });
        }
      },
      close: close
    };
  });
  useEffect(function () {
    if (!props.closeOnTouchOutside) return;

    function handle(e) {
      if (x.get() === 0) {
        return;
      }

      var root = rootRef.current;

      if (root && !root.contains(e.target)) {
        close();
      }
    }

    document.addEventListener('touchstart', handle);
    return function () {
      document.removeEventListener('touchstart', handle);
    };
  }, [props.closeOnTouchOutside]);

  function renderAction(action) {
    var _a, _b;

    var color = (_a = action.color) !== null && _a !== void 0 ? _a : 'light';
    return /*#__PURE__*/React.createElement(Button, {
      key: action.key,
      className: 'adm-swipe-action-action-button',
      style: {
        '--background-color': (_b = colorRecord[color]) !== null && _b !== void 0 ? _b : color
      },
      onClick: function onClick(e) {
        var _a, _b;

        if (props.closeOnAction) {
          close();
        }

        (_a = action.onClick) === null || _a === void 0 ? void 0 : _a.call(action, e);
        (_b = props.onAction) === null || _b === void 0 ? void 0 : _b.call(props, action);
      }
    }, action.text);
  }

  return withNativeProps(props, /*#__PURE__*/React.createElement("div", Object.assign({
    className: 'adm-swipe-action'
  }, bind(), {
    ref: rootRef,
    onClickCapture: function onClickCapture(e) {
      if (draggingRef.current) {
        e.stopPropagation();
        e.preventDefault();
      }
    }
  }), /*#__PURE__*/React.createElement(animated.div, {
    className: 'adm-swipe-action-track',
    style: {
      x: x
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: 'adm-swipe-action-actions adm-swipe-action-actions-left',
    ref: leftRef
  }, props.leftActions.map(renderAction)), /*#__PURE__*/React.createElement("div", {
    className: 'adm-swipe-action-content',
    onClickCapture: function onClickCapture(e) {
      if (x.goal !== 0) {
        e.preventDefault();
        e.stopPropagation();
        api.start({
          x: 0
        });
      }
    }
  }, /*#__PURE__*/React.createElement(animated.div, {
    style: {
      pointerEvents: x.to(function (v) {
        return v !== 0 && x.goal !== 0 ? 'none' : 'unset';
      })
    }
  }, props.children)), /*#__PURE__*/React.createElement("div", {
    className: 'adm-swipe-action-actions adm-swipe-action-actions-right',
    ref: rightRef
  }, props.rightActions.map(renderAction)))));
});
var colorRecord = {
  light: 'var(--adm-color-light)',
  weak: 'var(--adm-color-weak)',
  primary: 'var(--adm-color-primary)',
  success: 'var(--adm-color-success)',
  warning: 'var(--adm-color-warning)',
  danger: 'var(--adm-color-danger)'
};