import React from 'react';
import { mergeProps } from '../../utils/with-default-props';
import { CheckboxGroupContext } from './group-context';
import { usePropsValue } from '../../utils/use-props-value';
var defaultProps = {
  disabled: false,
  defaultValue: []
};
export var Group = function Group(p) {
  var props = mergeProps(defaultProps, p);

  var _usePropsValue = usePropsValue(props),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  return /*#__PURE__*/React.createElement(CheckboxGroupContext.Provider // TODO: 性能优化
  , {
    // TODO: 性能优化
    value: {
      value: value,
      disabled: props.disabled,
      check: function check(v) {
        setValue([].concat(value, [v]));
      },
      uncheck: function uncheck(v) {
        setValue(value.filter(function (item) {
          return item !== v;
        }));
      }
    }
  }, props.children);
};