import React from 'react';
import { mergeProps } from '../../utils/with-default-props';
import { RadioGroupContext } from './group-context';
import { usePropsValue } from '../../utils/use-props-value';
var defaultProps = {
  disabled: false,
  defaultValue: null
};
export var Group = function Group(p) {
  var props = mergeProps(defaultProps, p);

  var _usePropsValue = usePropsValue(props),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  return /*#__PURE__*/React.createElement(RadioGroupContext.Provider // TODO: 性能优化
  , {
    // TODO: 性能优化
    value: {
      value: value === null ? [] : [value],
      check: function check(v) {
        setValue(v);
      },
      uncheck: function uncheck() {},
      disabled: props.disabled
    }
  }, props.children);
};