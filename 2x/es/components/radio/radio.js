import React, { useContext } from 'react';
import { withNativeProps } from '../../utils/native-props';
import classNames from 'classnames';
import { RadioGroupContext } from './group-context';
import { usePropsValue } from '../../utils/use-props-value';
import { mergeProps } from '../../utils/with-default-props';
import { CheckIcon } from '../checkbox/check-icon';
const classPrefix = `adm-radio`;
const defaultProps = {
  defaultChecked: false
};
export const Radio = p => {
  const props = mergeProps(defaultProps, p);
  const groupContext = useContext(RadioGroupContext);
  let [checked, setChecked] = usePropsValue({
    value: props.checked,
    defaultValue: props.defaultChecked,
    onChange: props.onChange
  });
  let disabled = props.disabled;
  const {
    value
  } = props;

  if (groupContext && value !== undefined) {
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
      }, props.icon(checked));
    }

    return React.createElement("div", {
      className: `${classPrefix}-icon`
    }, checked && React.createElement(CheckIcon, null));
  };

  return withNativeProps(props, React.createElement("label", {
    className: classNames(classPrefix, props.className, {
      [`${classPrefix}-checked`]: checked,
      [`${classPrefix}-disabled`]: disabled,
      [`${classPrefix}-block`]: props.block
    }),
    style: props.style
  }, React.createElement("input", {
    type: 'radio',
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