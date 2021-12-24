import React, { createRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { withNativeProps } from '../../utils/native-props';
import { mergeProps } from '../../utils/with-default-props';
import classNames from 'classnames';
import Popup from '../popup';
import Button from '../button';
import { renderToBody } from '../../utils/render-to-body';
import SafeArea from '../safe-area';
var classPrefix = "adm-action-sheet";
var defaultProps = {
  visible: false,
  actions: [],
  cancelText: '',
  closeOnAction: false,
  closeOnMaskClick: true,
  safeArea: true
};
export var ActionSheet = function ActionSheet(p) {
  var props = mergeProps(defaultProps, p);
  return /*#__PURE__*/React.createElement(Popup, {
    visible: props.visible,
    onMaskClick: function onMaskClick() {
      var _a, _b;

      (_a = props.onMaskClick) === null || _a === void 0 ? void 0 : _a.call(props);

      if (props.closeOnMaskClick) {
        (_b = props.onClose) === null || _b === void 0 ? void 0 : _b.call(props);
      }
    },
    afterClose: props.afterClose,
    className: classPrefix + "-popup",
    getContainer: props.getContainer
  }, withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classPrefix
  }, props.extra && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-extra"
  }, props.extra), /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-button-list"
  }, props.actions.map(function (action, index) {
    var _classNames;

    return /*#__PURE__*/React.createElement("div", {
      key: action.key,
      className: classPrefix + "-button-item-wrapper"
    }, /*#__PURE__*/React.createElement(Button, {
      block: true,
      fill: 'none',
      disabled: action.disabled,
      onClick: function onClick() {
        var _a, _b, _c;

        (_a = action.onClick) === null || _a === void 0 ? void 0 : _a.call(action);
        (_b = props.onAction) === null || _b === void 0 ? void 0 : _b.call(props, action, index);

        if (props.closeOnAction) {
          (_c = props.onClose) === null || _c === void 0 ? void 0 : _c.call(props);
        }
      },
      className: classNames(classPrefix + "-button-item", (_classNames = {}, _classNames[classPrefix + "-button-item-danger"] = action.danger, _classNames))
    }, /*#__PURE__*/React.createElement("div", {
      className: classPrefix + "-button-item-name"
    }, action.text), action.description && /*#__PURE__*/React.createElement("div", {
      className: classPrefix + "-button-item-description"
    }, action.description)));
  })), props.cancelText && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-cancel"
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-button-item-wrapper"
  }, /*#__PURE__*/React.createElement(Button, {
    block: true,
    fill: 'none',
    className: classPrefix + "-button-item",
    onClick: function onClick() {
      var _a;

      (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-button-item-name"
  }, props.cancelText)))), props.safeArea && /*#__PURE__*/React.createElement(SafeArea, {
    position: 'bottom'
  }))));
};
export function showActionSheet(props) {
  var Wrapper = /*#__PURE__*/forwardRef(function (_, ref) {
    var _useState = useState(false),
        visible = _useState[0],
        setVisible = _useState[1];

    useEffect(function () {
      setVisible(true);
    }, []);

    function handleClose() {
      var _a;

      (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
      setVisible(false);
    }

    useImperativeHandle(ref, function () {
      return {
        close: handleClose
      };
    });
    return /*#__PURE__*/React.createElement(ActionSheet, Object.assign({}, props, {
      visible: visible,
      onClose: handleClose,
      afterClose: function afterClose() {
        var _a;

        (_a = props.afterClose) === null || _a === void 0 ? void 0 : _a.call(props);
        unmount();
      }
    }));
  });
  var ref = /*#__PURE__*/createRef();
  var unmount = renderToBody( /*#__PURE__*/React.createElement(Wrapper, {
    ref: ref
  }));
  return {
    close: function close() {
      var _a;

      (_a = ref.current) === null || _a === void 0 ? void 0 : _a.close();
    }
  };
}