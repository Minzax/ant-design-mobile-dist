import React, { useContext } from 'react';
import { withNativeProps } from '../../utils/native-props';
import classNames from 'classnames';
import { CheckboxGroupContext } from './group-context';
import { usePropsValue } from '../../utils/use-props-value';
import { mergeProps } from '../../utils/with-default-props';
import { devWarning } from '../../utils/dev-log';
import { CheckIcon } from './check-icon';
var classPrefix = "adm-checkbox";
var defaultProps = {
  defaultChecked: false,
  indeterminate: false
};
export var Checkbox = function Checkbox(p) {
  var _classNames;

  var groupContext = useContext(CheckboxGroupContext);
  var props = mergeProps(defaultProps, p);

  var _usePropsValue = usePropsValue({
    value: props.checked,
    defaultValue: props.defaultChecked,
    onChange: props.onChange
  }),
      checked = _usePropsValue[0],
      setChecked = _usePropsValue[1];

  var disabled = props.disabled;

  var usageWarning = function usageWarning() {
    if (p.checked !== undefined) {
      devWarning('Checkbox', 'When used with `Checkbox.Group`, the `checked` prop of `Checkbox` will not work if `value` prop of `Checkbox` is not undefined.');
    }

    if (p.defaultChecked !== undefined) {
      devWarning('Checkbox', 'When used with `Checkbox.Group`, the `defaultChecked` prop of `Checkbox` will not work if `value` prop of `Checkbox` is not undefined.');
    }
  };

  var value = props.value;

  if (groupContext && value !== undefined) {
    usageWarning();
    checked = groupContext.value.includes(value);

    setChecked = function setChecked(checked) {
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

  var renderIcon = function renderIcon() {
    if (props.icon) {
      return /*#__PURE__*/React.createElement("div", {
        className: classPrefix + "-custom-icon"
      }, props.icon(checked, props.indeterminate));
    }

    return /*#__PURE__*/React.createElement("div", {
      className: classPrefix + "-icon"
    }, props.indeterminate ? /*#__PURE__*/React.createElement("div", {
      className: classPrefix + "-indeterminate-checked"
    }) : checked && /*#__PURE__*/React.createElement(CheckIcon, {
      className: classPrefix + "-icon-checked"
    }));
  };

  return withNativeProps(props, /*#__PURE__*/React.createElement("label", {
    className: classNames(classPrefix, (_classNames = {}, _classNames[classPrefix + "-checked"] = checked, _classNames[classPrefix + "-indeterminate"] = props.indeterminate, _classNames[classPrefix + "-disabled"] = disabled, _classNames[classPrefix + "-block"] = props.block, _classNames))
  }, /*#__PURE__*/React.createElement("input", {
    type: 'checkbox',
    checked: checked,
    onChange: function onChange(e) {
      setChecked(e.target.checked);
    },
    onClick: function onClick(e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    },
    disabled: disabled,
    id: props.id
  }), renderIcon(), props.children && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-content"
  }, props.children)));
};