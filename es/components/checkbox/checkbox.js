import React, { useContext } from 'react';
import { withNativeProps } from '../../utils/native-props';
import classNames from 'classnames';
import { CheckboxGroupContext } from './group-context';
import { usePropsValue } from '../../utils/use-props-value';
import { mergeProps } from '../../utils/with-default-props';
import { devWarning } from '../../utils/dev-log';
import { CheckIcon } from './check-icon';
import { IndeterminateIcon } from './indeterminate-icon';
const classPrefix = `adm-checkbox`;
const defaultProps = {
  defaultChecked: false,
  indeterminate: false
};
export const Checkbox = p => {
  const groupContext = useContext(CheckboxGroupContext);
  const props = mergeProps(defaultProps, p);
  let [checked, setChecked] = usePropsValue({
    value: props.checked,
    defaultValue: props.defaultChecked,
    onChange: props.onChange
  });
  let disabled = props.disabled;

  const usageWarning = () => {
    if (p.checked !== undefined) {
      devWarning('Checkbox', 'When used with `Checkbox.Group`, the `checked` prop of `Checkbox` will not work if `value` prop of `Checkbox` is not undefined.');
    }

    if (p.defaultChecked !== undefined) {
      devWarning('Checkbox', 'When used with `Checkbox.Group`, the `defaultChecked` prop of `Checkbox` will not work if `value` prop of `Checkbox` is not undefined.');
    }
  };

  const {
    value
  } = props;

  if (groupContext && value !== undefined) {
    usageWarning();
    checked = groupContext.value.includes(value);

    setChecked = checked => {
      var _a;

      if (checked) {
        groupContext.check(value);
      } else {
        groupContext.uncheck(value);
      }

      (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, checked);
    };

    disabled = disabled || groupContext.disabled;
  }

  const renderIcon = () => {
    if (props.icon) {
      return React.createElement("div", {
        className: `${classPrefix}-custom-icon`
      }, props.icon(checked, props.indeterminate));
    }

    return React.createElement("div", {
      className: `${classPrefix}-icon`
    }, props.indeterminate ? React.createElement(IndeterminateIcon, null) : checked && React.createElement(CheckIcon, null));
  };

  return withNativeProps(props, React.createElement("label", {
    className: classNames(classPrefix, {
      [`${classPrefix}-checked`]: checked && !props.indeterminate,
      [`${classPrefix}-indeterminate`]: props.indeterminate,
      [`${classPrefix}-disabled`]: disabled,
      [`${classPrefix}-block`]: props.block
    })
  }, React.createElement("input", {
    type: 'checkbox',
    checked: checked,
    onChange: e => {
      setChecked(e.target.checked);
    },
    onClick: e => {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    },
    disabled: disabled,
    id: props.id
  }), renderIcon(), props.children && React.createElement("div", {
    className: `${classPrefix}-content`
  }, props.children)));
};