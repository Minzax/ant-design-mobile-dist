import React from 'react';
import { withNativeProps } from '../../utils/native-props';
import List from '../list';
import { mergeProps } from '../../utils/with-default-props';
import { CheckListContext } from './context';
import { usePropsValue } from '../../utils/use-props-value';
import { CheckOutline } from 'antd-mobile-icons';
var defaultProps = {
  multiple: false,
  defaultValue: [],
  activeIcon: /*#__PURE__*/React.createElement(CheckOutline, null)
};
export var CheckList = function CheckList(p) {
  var props = mergeProps(defaultProps, p);

  var _usePropsValue = usePropsValue(props),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  function check(val) {
    if (props.multiple) {
      setValue([].concat(value, [val]));
    } else {
      setValue([val]);
    }
  }

  function uncheck(val) {
    setValue(value.filter(function (item) {
      return item !== val;
    }));
  }

  var activeIcon = props.activeIcon,
      disabled = props.disabled,
      readOnly = props.readOnly;
  return /*#__PURE__*/React.createElement(CheckListContext.Provider, {
    value: {
      value: value,
      check: check,
      uncheck: uncheck,
      activeIcon: activeIcon,
      disabled: disabled,
      readOnly: readOnly
    }
  }, withNativeProps(props, /*#__PURE__*/React.createElement(List, {
    mode: props.mode
  }, props.children)));
};