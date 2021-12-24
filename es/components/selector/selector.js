import classNames from 'classnames';
import React from 'react';
import { withNativeProps } from '../../utils/native-props';
import { mergeProps } from '../../utils/with-default-props';
import Space from '../space';
import Grid from '../grid';
import { convertPx } from '../../utils/convert-px';
import selectorCheckMarkImg from '../../assets/selector-check-mark.svg';
import { usePropsValue } from '../../utils/use-props-value';
var classPrefix = "adm-selector";
var defaultProps = {
  multiple: false,
  defaultValue: []
};
export var Selector = function Selector(p) {
  var props = mergeProps(defaultProps, p);

  var _usePropsValue = usePropsValue({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: function onChange(val) {
      var _a;

      var extend = {
        get items() {
          return props.options.filter(function (option) {
            return val.includes(option.value);
          });
        }

      };
      (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, val, extend);
    }
  }),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var items = props.options.map(function (option) {
    var _classNames;

    var active = (value || []).includes(option.value);
    var disabled = option.disabled || props.disabled;
    var itemCls = classNames(classPrefix + "-item", (_classNames = {}, _classNames[classPrefix + "-item-active"] = active && !props.multiple, _classNames[classPrefix + "-item-multiple-active"] = active && props.multiple, _classNames[classPrefix + "-item-disabled"] = disabled, _classNames));
    return /*#__PURE__*/React.createElement("div", {
      key: option.value,
      className: itemCls,
      onClick: function onClick() {
        if (disabled) {
          return;
        }

        if (props.multiple) {
          var val = active ? value.filter(function (v) {
            return v !== option.value;
          }) : [].concat(value, [option.value]);
          setValue(val);
        } else {
          var _val = active ? [] : [option.value];

          setValue(_val);
        }
      }
    }, option.label, active && props.multiple && /*#__PURE__*/React.createElement("div", {
      className: classPrefix + "-check-mark-wrapper"
    }, /*#__PURE__*/React.createElement("img", {
      src: selectorCheckMarkImg
    })));
  });
  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classPrefix
  }, !props.columns && /*#__PURE__*/React.createElement(Space, {
    wrap: true
  }, items), props.columns && /*#__PURE__*/React.createElement(Grid, {
    columns: props.columns,
    gap: convertPx(8)
  }, items)));
};