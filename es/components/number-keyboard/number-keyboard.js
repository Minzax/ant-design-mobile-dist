import React, { useRef, useMemo } from 'react';
import classNames from 'classnames';
import { DownOutline, TextDeletionOutline } from 'antd-mobile-icons';
import { mergeProps } from '../../utils/with-default-props';
import { shuffle } from '../../utils/shuffle';
import Popup from '../popup';
import { withNativeProps } from '../../utils/native-props';
import SafeArea from '../safe-area';
import { usePersistFn } from 'ahooks';
var classPrefix = 'adm-number-keyboard';
var defaultProps = {
  defaultVisible: false,
  randomOrder: false,
  showCloseButton: true,
  confirmText: null,
  closeOnConfirm: true,
  safeArea: true
};
export var NumberKeyboard = function NumberKeyboard(p) {
  var props = mergeProps(defaultProps, p);
  var visible = props.visible,
      title = props.title,
      getContainer = props.getContainer,
      confirmText = props.confirmText,
      customKey = props.customKey,
      randomOrder = props.randomOrder,
      showCloseButton = props.showCloseButton,
      onInput = props.onInput;
  var keyboardRef = useRef(null);
  var keys = useMemo(function () {
    var defaultKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var keyList = randomOrder ? shuffle(defaultKeys) : defaultKeys;
    keyList.push('0');

    if (confirmText) {
      keyList.push(customKey || '');
    } else {
      keyList.splice(9, 0, customKey || '');
      keyList.push('BACKSPACE');
    }

    return keyList;
  }, [customKey, confirmText, randomOrder, randomOrder && visible]);
  var timeoutRef = useRef(-1);
  var intervalRef = useRef(-1);
  var onDelete = usePersistFn(function () {
    var _a;

    (_a = props.onDelete) === null || _a === void 0 ? void 0 : _a.call(props);
  });

  var onBackspacePressStart = function onBackspacePressStart() {
    timeoutRef.current = window.setTimeout(function () {
      onDelete();
      intervalRef.current = window.setInterval(onDelete, 150);
    }, 700);
  };

  var onBackspacePressEnd = function onBackspacePressEnd() {
    clearTimeout(timeoutRef.current);
    clearInterval(intervalRef.current);
  }; // 点击键盘按键


  var onKeyPress = function onKeyPress(e, key) {
    var _a, _b;

    e.preventDefault();

    switch (key) {
      case 'BACKSPACE':
        onDelete === null || onDelete === void 0 ? void 0 : onDelete();
        break;

      case 'OK':
        (_a = props.onConfirm) === null || _a === void 0 ? void 0 : _a.call(props);

        if (props.closeOnConfirm) {
          (_b = props.onClose) === null || _b === void 0 ? void 0 : _b.call(props);
        }

        break;

      default:
        // 当 customKey 不存在时，点击该键不应该触发 onInput
        if (key !== '') onInput === null || onInput === void 0 ? void 0 : onInput(key);
        break;
    }
  }; // 渲染 title 和 close button


  var renderHeader = function renderHeader() {
    if (!showCloseButton && !title) return null;
    return /*#__PURE__*/React.createElement("div", {
      className: classNames(classPrefix + "-header", {
        'with-title': !!title
      })
    }, title && /*#__PURE__*/React.createElement("div", {
      className: classPrefix + "-title"
    }, title), showCloseButton && /*#__PURE__*/React.createElement("span", {
      className: classPrefix + "-header-close-button",
      onClick: function onClick() {
        var _a;

        (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
      },
      role: 'button',
      title: 'CLOSE'
    }, /*#__PURE__*/React.createElement(DownOutline, null)));
  }; // 渲染基础键盘按键


  var renderKey = function renderKey(key, index) {
    var isNumberKey = /^\d$/.test(key);
    var className = classNames(classPrefix + "-key", {
      'number-key': isNumberKey,
      'sign-key': !isNumberKey && key,
      'mid-key': index === 9 && !!confirmText
    });
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      className: className,
      onTouchStart: function onTouchStart() {
        if (key === 'BACKSPACE') {
          onBackspacePressStart();
        }
      },
      onTouchEnd: function onTouchEnd(e) {
        onKeyPress(e, key);

        if (key === 'BACKSPACE') {
          onBackspacePressEnd();
        }
      },
      onMouseUp: function onMouseUp(e) {
        onKeyPress(e, key);
      },
      title: key,
      role: 'button'
    }, key === 'BACKSPACE' ? /*#__PURE__*/React.createElement(TextDeletionOutline, null) : key);
  };

  return /*#__PURE__*/React.createElement(Popup, {
    visible: visible,
    getContainer: getContainer,
    mask: false,
    afterClose: props.afterClose,
    afterShow: props.afterShow,
    className: classPrefix + "-popup",
    stopPropagation: props.stopPropagation
  }, withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    ref: keyboardRef,
    className: classPrefix,
    onMouseDown: function onMouseDown(e) {
      e.preventDefault();
    }
  }, renderHeader(), /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: classNames(classPrefix + "-main", {
      'confirmed-style': !!confirmText
    })
  }, keys.map(renderKey)), !!confirmText && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-confirm"
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-key extra-key bs-key",
    onTouchStart: function onTouchStart() {
      onBackspacePressStart();
    },
    onTouchEnd: function onTouchEnd(e) {
      onKeyPress(e, 'BACKSPACE');
      onBackspacePressEnd();
    },
    onMouseUp: function onMouseUp(e) {
      return onKeyPress(e, 'BACKSPACE');
    },
    title: 'BACKSPACE',
    role: 'button'
  }, /*#__PURE__*/React.createElement(TextDeletionOutline, null)), /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-key extra-key ok-key",
    onTouchEnd: function onTouchEnd(e) {
      return onKeyPress(e, 'OK');
    },
    onMouseUp: function onMouseUp(e) {
      return onKeyPress(e, 'OK');
    },
    role: 'button'
  }, confirmText))), props.safeArea && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-footer"
  }, /*#__PURE__*/React.createElement(SafeArea, {
    position: 'bottom'
  })))));
};