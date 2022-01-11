import React, { memo, useCallback, useEffect, useState } from 'react';
import { mergeProps } from '../../utils/with-default-props';
import { Wheel } from './wheel';
import { useColumns } from './use-columns';
import { withNativeProps } from '../../utils/native-props';
import { usePickerValueExtend } from './use-picker-value-extend';
import { useDebounceEffect } from 'ahooks';
var classPrefix = "adm-picker-view";
var defaultProps = {
  defaultValue: []
};
export var PickerView = /*#__PURE__*/memo(function (p) {
  var props = mergeProps(defaultProps, p);

  var _useState = useState(props.value === undefined ? props.defaultValue : props.value),
      innerValue = _useState[0],
      setInnerValue = _useState[1];

  useDebounceEffect(function () {
    var _a;

    if (props.value === innerValue) return;
    (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, innerValue, generateValueExtend(innerValue));
  }, [innerValue], {
    wait: 0,
    leading: false,
    trailing: true
  }); // Sync `value` to `innerValue`

  useEffect(function () {
    if (props.value === undefined) return; // Uncontrolled mode

    if (props.value === innerValue) return;
    setInnerValue(props.value);
  }, [props.value]);
  useEffect(function () {
    if (props.value === innerValue) return;
    var timeout = window.setTimeout(function () {
      if (props.value !== undefined && props.value !== innerValue) {
        setInnerValue(props.value);
      }
    }, 1000);
    return function () {
      window.clearTimeout(timeout);
    };
  }, [props.value, innerValue]);
  var columns = useColumns(props.columns, innerValue);
  var generateValueExtend = usePickerValueExtend(columns);
  var handleSelect = useCallback(function (val, index) {
    setInnerValue(function (prev) {
      var next = [].concat(prev);
      next[index] = val;
      return next;
    });
  }, []);
  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: "" + classPrefix
  }, columns.map(function (column, index) {
    return /*#__PURE__*/React.createElement(Wheel, {
      key: index,
      index: index,
      column: column,
      value: innerValue[index],
      onSelect: handleSelect
    });
  }), /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-mask"
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-mask-top"
  }), /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-mask-middle"
  }), /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-mask-bottom"
  }))));
});
PickerView.displayName = 'PickerView';