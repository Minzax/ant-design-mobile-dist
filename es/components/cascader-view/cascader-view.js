function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import Tabs from '../tabs';
import CheckList from '../check-list';
import { withNativeProps } from '../../utils/native-props';
import { mergeProps } from '../../utils/with-default-props';
import { usePropsValue } from '../../utils/use-props-value';
import { useCascaderValueExtend } from './use-cascader-value-extend';
import { useConfig } from '../config-provider';
var classPrefix = "adm-cascader-view";
var defaultProps = {
  defaultValue: []
};
export var CascaderView = function CascaderView(p) {
  var _useConfig = useConfig(),
      locale = _useConfig.locale;

  var props = mergeProps(defaultProps, {
    placeholder: locale.Cascader.placeholder
  }, p);

  var _usePropsValue = usePropsValue(Object.assign(Object.assign({}, props), {
    onChange: function onChange(val) {
      var _a;

      (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, val, generateValueExtend(val));
    }
  })),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var _useState = useState(0),
      tabActiveKey = _useState[0],
      setTabActiveKey = _useState[1];

  var generateValueExtend = useCascaderValueExtend(props.options);
  var levels = useMemo(function () {
    var ret = [];
    var currentOptions = props.options;
    var reachedEnd = false;

    var _loop = function _loop() {
      var v = _step.value;
      var target = currentOptions.find(function (option) {
        return option.value === v;
      });
      ret.push({
        selected: target,
        options: currentOptions
      });

      if (!target || !target.children) {
        reachedEnd = true;
        return "break";
      }

      currentOptions = target.children;
    };

    for (var _iterator = _createForOfIteratorHelperLoose(value), _step; !(_step = _iterator()).done;) {
      var _ret = _loop();

      if (_ret === "break") break;
    }

    if (!reachedEnd) {
      ret.push({
        selected: undefined,
        options: currentOptions
      });
    }

    return ret;
  }, [value, props.options]);
  useEffect(function () {
    setTabActiveKey(levels.length - 1);
  }, [value]);

  var onItemSelect = function onItemSelect(selectValue, depth) {
    var next = value.slice(0, depth);

    if (selectValue !== undefined) {
      next[depth] = selectValue;
    }

    setValue(next);
  };

  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classPrefix
  }, /*#__PURE__*/React.createElement(Tabs, {
    activeKey: tabActiveKey.toString(),
    onChange: function onChange(key) {
      return setTabActiveKey(parseInt(key));
    },
    stretch: false,
    className: classPrefix + "-tabs"
  }, levels.map(function (level, index) {
    var selected = level.selected;
    return /*#__PURE__*/React.createElement(Tabs.Tab, {
      key: index,
      title: /*#__PURE__*/React.createElement("div", {
        className: classPrefix + "-header-title"
      }, selected ? selected.label : props.placeholder),
      forceRender: true
    }, /*#__PURE__*/React.createElement(CheckList, {
      value: [value[index]],
      onChange: function onChange(selectValue) {
        return onItemSelect(selectValue[0], index);
      },
      className: classPrefix + "-content"
    }, level.options.map(function (option) {
      var _classNames;

      var active = value[index] === option.value;
      return /*#__PURE__*/React.createElement(CheckList.Item, {
        value: option.value,
        key: option.value,
        disabled: option.disabled,
        className: classNames(classPrefix + "-item", (_classNames = {}, _classNames[classPrefix + "-item-active"] = active, _classNames))
      }, option.label);
    })));
  }))));
};