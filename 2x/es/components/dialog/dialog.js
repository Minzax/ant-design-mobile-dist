var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

import React, { useState } from 'react';
import { mergeProps } from '../../utils/with-default-props';
import classNames from 'classnames';
import { useUnmountedRef } from 'ahooks';
import Mask from '../mask';
import { DialogActionButton } from './dialog-action-button';
import Image from '../image';
import Space from '../space';
import { renderToContainer } from '../../utils/render-to-container';
import { withStopPropagation } from '../../utils/with-stop-propagation';
import AutoCenter from '../auto-center';
import { useSpring, animated } from '@react-spring/web';
import { withNativeProps } from '../../utils/native-props';
var classPrefix = "adm-dialog";
var defaultProps = {
  visible: false,
  actions: [],
  closeOnAction: false,
  closeOnMaskClick: false,
  stopPropagation: ['click'],
  getContainer: null
};
export var Dialog = function Dialog(p) {
  var props = mergeProps(defaultProps, p);
  var unmountedRef = useUnmountedRef();
  var style = useSpring({
    scale: props.visible ? 1 : 0.8,
    opacity: props.visible ? 1 : 0,
    config: {
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
  });

  var _useState = useState(props.visible),
      active = _useState[0],
      setActive = _useState[1];

  var node = withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classPrefix,
    style: {
      display: active ? 'unset' : 'none'
    }
  }, /*#__PURE__*/React.createElement(Mask, {
    visible: props.visible,
    onMaskClick: props.closeOnMaskClick ? props.onClose : undefined,
    style: props.maskStyle,
    className: classNames(classPrefix + "-mask", props.maskClassName)
  }), /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-wrap",
    style: {
      pointerEvents: props.visible ? 'unset' : 'none'
    }
  }, /*#__PURE__*/React.createElement(animated.div, {
    style: Object.assign({}, style),
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    className: classPrefix + "-main"
  }, !!props.image && /*#__PURE__*/React.createElement(Image, {
    src: props.image,
    alt: 'dialog header image',
    width: '100%'
  }), /*#__PURE__*/React.createElement("div", {
    style: props.bodyStyle,
    className: classNames(classPrefix + "-body", props.bodyClassName)
  }, /*#__PURE__*/React.createElement(Space, {
    direction: 'vertical',
    block: true
  }, !!props.header && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-body-header-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-body-header"
  }, props.header)), !!props.title && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-body-title"
  }, props.title), !!props.content && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-body-content"
  }, typeof props.content === 'string' ? /*#__PURE__*/React.createElement(AutoCenter, null, props.content) : props.content))), /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-footer"
  }, props.actions.map(function (row, index) {
    var actions = Array.isArray(row) ? row : [row];
    return /*#__PURE__*/React.createElement("div", {
      className: classPrefix + "-action-row",
      key: index
    }, actions.map(function (action, index) {
      return /*#__PURE__*/React.createElement(DialogActionButton, {
        key: action.key,
        action: action,
        onAction: function onAction() {
          return __awaiter(void 0, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var _a, _b, _c;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return Promise.all([(_a = action.onClick) === null || _a === void 0 ? void 0 : _a.call(action), (_b = props.onAction) === null || _b === void 0 ? void 0 : _b.call(props, action, index)]);

                  case 2:
                    if (props.closeOnAction) {
                      (_c = props.onClose) === null || _c === void 0 ? void 0 : _c.call(props);
                    }

                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));
        }
      });
    }));
  }))))));
  return renderToContainer(props.getContainer, withStopPropagation(props.stopPropagation, node));
};