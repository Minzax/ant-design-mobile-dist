import React from 'react';
import classNames from 'classnames';
import { withNativeProps } from '../../utils/native-props';
import { mergeProps } from '../../utils/with-default-props';
import { StarFill } from 'antd-mobile-icons';
import { usePropsValue } from '../../utils/use-props-value';
var classPrefix = "adm-rate";
var defaultProps = {
  count: 5,
  allowHalf: false,
  character: /*#__PURE__*/React.createElement(StarFill, null),
  defaultValue: 0,
  readOnly: false,
  allowClear: true
};
export var Rate = function Rate(p) {
  var props = mergeProps(defaultProps, p);

  var _usePropsValue = usePropsValue(props),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var starList = Array(props.count).fill(null);

  function renderStar(v, half) {
    var _classNames;

    return /*#__PURE__*/React.createElement("div", {
      className: classNames(classPrefix + "-star", (_classNames = {}, _classNames[classPrefix + "-star-active"] = value >= v, _classNames[classPrefix + "-star-half"] = half, _classNames[classPrefix + "-star-readonly"] = props.readOnly, _classNames)),
      onClick: function onClick() {
        if (props.readOnly) return;

        if (props.allowClear && value === v) {
          setValue(0);
        } else {
          setValue(v);
        }
      }
    }, props.character);
  }

  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classPrefix
  }, starList.map(function (_, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: classNames(classPrefix + "-box")
    }, props.allowHalf && renderStar(i + 0.5, true), renderStar(i + 1, false));
  })));
};