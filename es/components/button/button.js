import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import DotLoading from '../dot-loading';
import { mergeProps } from '../../utils/with-default-props';
import { withNativeProps } from '../../utils/native-props';
const classPrefix = `adm-button`;
const defaultProps = {
  color: 'default',
  fill: 'solid',
  block: false,
  loading: false,
  type: 'button',
  shape: 'default',
  size: 'middle'
};
export const Button = forwardRef((p, ref) => {
  const props = mergeProps(defaultProps, p);
  const disabled = props.disabled || props.loading;
  const nativeButtonRef = useRef(null);
  useImperativeHandle(ref, () => ({
    get nativeElement() {
      return nativeButtonRef.current;
    }

  }));
  return withNativeProps(props, React.createElement("button", {
    ref: nativeButtonRef,
    type: props.type,
    onClick: props.onClick,
    className: classNames(classPrefix, props.color ? `${classPrefix}-${props.color}` : null, {
      [`${classPrefix}-block`]: props.block,
      [`${classPrefix}-disabled`]: disabled,
      [`${classPrefix}-fill-outline`]: props.fill === 'outline',
      [`${classPrefix}-fill-none`]: props.fill === 'none',
      [`${classPrefix}-mini`]: props.size === 'mini',
      [`${classPrefix}-small`]: props.size === 'small',
      [`${classPrefix}-large`]: props.size === 'large',
      [`${classPrefix}-loading`]: props.loading
    }, `${classPrefix}-shape-${props.shape}`),
    disabled: disabled
  }, props.loading ? React.createElement("div", {
    className: `${classPrefix}-loading-wrapper`
  }, React.createElement(DotLoading, {
    color: 'currentColor'
  }), props.loadingText) : props.children));
});