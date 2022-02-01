import React, { useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { mergeProps } from '../../utils/with-default-props';
import { withNativeProps } from '../../utils/native-props';
const classPrefix = `adm-floating-bubble`;
const defaultProps = {};
export const FloatingBubble = p => {
  const props = mergeProps(defaultProps, p);
  const boundaryRef = useRef(null);
  /**
   * memoize the `to` function
   * inside a component that renders frequently
   * to prevent an unintended restart
   */

  const [animationStyles, animation] = useSpring(() => ({
    y: 0,
    scale: 1,
    opacity: 1
  }));
  const bind = useDrag(state => {
    if (state.down) {
      // be movable in y axis
      animation.start({
        y: state.offset[1]
      });
    } // active status


    animation.start({
      scale: state.active ? 1.1 : 1,
      opacity: state.active ? 0.8 : 1
    });
  }, {
    // only trigger if a movement is detected on the specified axis.
    axis: 'y',
    pointer: {
      touch: true
    },
    // the component won't trigger drag logic if the user just clicked on the component.
    filterTaps: true,
    // set constraints to the user gesture
    bounds: boundaryRef
  });
  return withNativeProps(props, React.createElement("div", {
    className: classPrefix
  }, React.createElement("div", {
    className: `${classPrefix}-boundary-outer`
  }, React.createElement("div", {
    className: `${classPrefix}-boundary`,
    ref: boundaryRef
  })), React.createElement(animated.div, Object.assign({}, bind(), {
    style: Object.assign({}, animationStyles),
    onClick: props.onClick,
    className: `${classPrefix}-button`
  }), props.children)));
};