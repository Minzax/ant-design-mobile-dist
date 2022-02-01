import { __awaiter } from "tslib";
import React, { useState } from 'react';
import { mergeProps } from '../../utils/with-default-props';
import classNames from 'classnames';
import { useUnmountedRef } from 'ahooks';
import Mask from '../mask';
import { ModalActionButton } from './modal-action-button';
import Image from '../image';
import Space from '../space';
import { renderToContainer } from '../../utils/render-to-container';
import { withStopPropagation } from '../../utils/with-stop-propagation';
import AutoCenter from '../auto-center';
import { useSpring, animated } from '@react-spring/web';
import { withNativeProps } from '../../utils/native-props';
import { CloseOutline } from 'antd-mobile-icons';
const classPrefix = `adm-modal`;
const defaultProps = {
  visible: false,
  actions: [],
  closeOnAction: false,
  closeOnMaskClick: false,
  stopPropagation: ['click'],
  showCloseButton: false,
  getContainer: null
};
export const Modal = p => {
  const props = mergeProps(defaultProps, p);
  const unmountedRef = useUnmountedRef();
  const style = useSpring({
    scale: props.visible ? 1 : 0.8,
    opacity: props.visible ? 1 : 0,
    config: {
      mass: 1,
      tension: 200,
      friction: 30,
      clamp: true
    },
    onStart: () => {
      setActive(true);
    },
    onRest: () => {
      var _a, _b;

      if (unmountedRef.current) return;
      setActive(props.visible);

      if (props.visible) {
        (_a = props.afterShow) === null || _a === void 0 ? void 0 : _a.call(props);
      } else {
        (_b = props.afterClose) === null || _b === void 0 ? void 0 : _b.call(props);
      }
    }
  });
  const [active, setActive] = useState(props.visible);
  const node = withStopPropagation(props.stopPropagation, withNativeProps(props, React.createElement("div", {
    className: classPrefix,
    style: {
      display: active ? 'unset' : 'none'
    }
  }, React.createElement(Mask, {
    visible: props.visible,
    onMaskClick: props.closeOnMaskClick ? props.onClose : undefined,
    style: props.maskStyle,
    className: classNames(`${classPrefix}-mask`, props.maskClassName)
  }), React.createElement("div", {
    className: `${classPrefix}-wrap`,
    style: {
      pointerEvents: props.visible ? 'unset' : 'none'
    }
  }, React.createElement(animated.div, {
    style: Object.assign({}, style),
    onClick: e => e.stopPropagation(),
    className: `${classPrefix}-main`
  }, props.showCloseButton && React.createElement("a", {
    className: classNames(`${classPrefix}-close`, 'adm-plain-anchor'),
    onClick: props.onClose
  }, React.createElement(CloseOutline, null)), !!props.image && React.createElement("div", {
    className: `${classPrefix}-image-container`
  }, React.createElement(Image, {
    src: props.image,
    alt: 'modal header image',
    width: '100%'
  })), React.createElement("div", {
    style: props.bodyStyle,
    className: classNames(`${classPrefix}-body`, props.bodyClassName)
  }, !!props.header && React.createElement("div", {
    className: `${classPrefix}-body-header-wrapper`
  }, React.createElement("div", {
    className: `${classPrefix}-body-header`
  }, props.header)), !!props.title && React.createElement("div", {
    className: `${classPrefix}-body-title`
  }, props.title), !!props.content && React.createElement("div", {
    className: `${classPrefix}-body-content`
  }, typeof props.content === 'string' ? React.createElement(AutoCenter, null, props.content) : props.content)), React.createElement(Space, {
    direction: 'vertical',
    block: true,
    className: `${classPrefix}-footer`
  }, props.actions.map((action, index) => {
    return React.createElement(ModalActionButton, {
      key: action.key,
      action: action,
      onAction: () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;

        yield Promise.all([(_a = action.onClick) === null || _a === void 0 ? void 0 : _a.call(action), (_b = props.onAction) === null || _b === void 0 ? void 0 : _b.call(props, action, index)]);

        if (props.closeOnAction) {
          (_c = props.onClose) === null || _c === void 0 ? void 0 : _c.call(props);
        }
      })
    });
  })))))));
  return renderToContainer(props.getContainer, node);
};