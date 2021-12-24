import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import classNames from 'classnames';
import Button from '../button';
import { Popover } from './popover';
var classPrefix = "adm-popover";
export var PopMenu = /*#__PURE__*/forwardRef(function (props, ref) {
  var innerRef = useRef(null);
  useImperativeHandle(ref, function () {
    return innerRef.current;
  }, []);

  var _onClick = useCallback(function (e) {
    var _a;

    var onAction = props.onAction;

    if (onAction) {
      onAction(e);
    }

    (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.hide();
  }, [props.onAction]);

  var overlay = useMemo(function () {
    return /*#__PURE__*/React.createElement(React.Fragment, null, (props.actions || []).map(function (ele, index) {
      var _classNames;

      var _a;

      return /*#__PURE__*/React.createElement("div", {
        className: classNames(classPrefix + "-inner-menu", (_classNames = {}, _classNames[classPrefix + "-inner-menu-with-icon"] = !!ele.icon, _classNames)),
        key: (_a = ele.key) !== null && _a !== void 0 ? _a : index
      }, /*#__PURE__*/React.createElement(Button, {
        disabled: ele.disabled,
        onClick: function onClick() {
          var _a;

          if (!ele.disabled) {
            _onClick(ele);

            (_a = ele.onClick) === null || _a === void 0 ? void 0 : _a.call(ele);
          }
        },
        fill: 'none',
        block: true
      }, ele.icon && /*#__PURE__*/React.createElement("span", {
        className: classPrefix + "-inner-menu-icon"
      }, ele.icon), ele.text));
    }));
  }, [props.actions, _onClick]);
  return /*#__PURE__*/React.createElement(Popover, Object.assign({
    ref: innerRef
  }, props, {
    overlayClassName: classNames(classPrefix + "-menu", props.overlayClassName),
    content: overlay
  }), props.children);
});