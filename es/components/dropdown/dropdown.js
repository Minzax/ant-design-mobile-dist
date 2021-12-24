import { useClickAway } from 'ahooks';
import classNames from 'classnames';
import React, { cloneElement, useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import Popup from '../popup';
import { ItemChildrenWrap } from './item';
import { withNativeProps } from '../../utils/native-props';
import { mergeProps } from '../../utils/with-default-props';
import { usePropsValue } from '../../utils/use-props-value';
var classPrefix = "adm-dropdown";
var defaultProps = {
  defaultActiveKey: null,
  closeOnMaskClick: true
};
var Dropdown = /*#__PURE__*/forwardRef(function (p, ref) {
  var _classNames;

  var props = mergeProps(defaultProps, p);

  var _usePropsValue = usePropsValue({
    value: props.activeKey,
    defaultValue: props.defaultActiveKey,
    onChange: props.onChange
  }),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var navRef = useRef(null);
  var contentRef = useRef(null); // 点击外部区域，关闭

  useClickAway(function () {
    setValue(null);
  }, [navRef, contentRef]); // 计算 navs 的 top 值

  var _useState = useState(),
      top = _useState[0],
      setTop = _useState[1];

  var containerRef = useRef(null);
  useEffect(function () {
    var container = containerRef.current;
    if (!container) return;

    if (value) {
      var rect = container.getBoundingClientRect();
      setTop(rect.bottom);
    }
  }, [value]);

  var changeActive = function changeActive(key) {
    if (value === key) {
      setValue(null);
    } else {
      setValue(key);
    }
  };

  var popupForceRender = false;
  var items = [];
  var navs = React.Children.map(props.children, function (child) {
    if ( /*#__PURE__*/React.isValidElement(child)) {
      var childProps = Object.assign(Object.assign({}, child.props), {
        onClick: function onClick() {
          changeActive(child.key);
        },
        active: child.key === value,
        arrow: child.props.arrow === undefined ? props.arrow : child.props.arrow
      });
      items.push(child);
      if (child.props.forceRender) popupForceRender = true;
      return /*#__PURE__*/cloneElement(child, childProps);
    } else {
      return child;
    }
  });
  useImperativeHandle(ref, function () {
    return {
      close: function close() {
        setValue(null);
      }
    };
  }, [setValue]);
  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classNames(classPrefix, (_classNames = {}, _classNames[classPrefix + "-open"] = !!value, _classNames)),
    ref: containerRef
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-nav",
    ref: navRef
  }, navs), /*#__PURE__*/React.createElement(Popup, {
    visible: !!value,
    position: 'top',
    className: classPrefix + "-popup",
    maskClassName: classPrefix + "-popup-mask",
    bodyClassName: classPrefix + "-popup-body",
    style: {
      top: top
    },
    forceRender: popupForceRender,
    onMaskClick: props.closeOnMaskClick ? function () {
      changeActive(null);
    } : undefined
  }, /*#__PURE__*/React.createElement("div", {
    ref: contentRef
  }, items.map(function (item) {
    var isActive = item.key === value;
    return /*#__PURE__*/React.createElement(ItemChildrenWrap, {
      key: item.key,
      active: isActive,
      forceRender: item.props.forceRender,
      destroyOnClose: item.props.destroyOnClose
    }, item.props.children);
  })))));
});
export default Dropdown;