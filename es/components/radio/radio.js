import React, { useContext } from 'react';
import { withNativeProps } from '../../utils/native-props';
import classNames from 'classnames';
import { RadioGroupContext } from './group-context';
import { usePropsValue } from '../../utils/use-props-value';
import { mergeProps } from '../../utils/with-default-props';
import { CheckIcon } from '../checkbox/check-icon';
var classPrefix = "adm-radio";
var defaultProps = {
  defaultChecked: false
};
export var Radio = function Radio(p) {
  var _classNames;

  var props = mergeProps(defaultProps, p);
  var groupContext = useContext(RadioGroupContext);

  var _usePropsValue = usePropsValue({
    value: props.checked,
    defaultValue: props.defaultChecked,
    onChange: props.onChange
  }),
      checked = _usePropsValue[0],
      setChecked = _usePropsValue[1];

  var disabled = props.disabled;
  var value = props.value;

  if (groupContext && value !== undefined) {
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
      }, props.icon(checked));
    }

    return /*#__PURE__*/React.createElement("div", {
      className: classPrefix + "-icon"
    }, checked && /*#__PURE__*/React.createElement(CheckIcon, {
      className: classPrefix + "-icon-checked"
    }));
  };

  return withNativeProps(props, /*#__PURE__*/React.createElement("label", {
    className: classNames(classPrefix, props.className, (_classNames = {}, _classNames[classPrefix + "-checked"] = checked, _classNames[classPrefix + "-disabled"] = disabled, _classNames[classPrefix + "-block"] = props.block, _classNames)),
    style: props.style
  }, /*#__PURE__*/React.createElement("input", {
    type: 'radio',
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