import classNames from 'classnames';
import React, { useMemo } from 'react';
import { withNativeProps } from '../../utils/native-props';
import { getTreeDeep } from '../../utils/tree';
import { mergeProps } from '../../utils/with-default-props';
import { usePropsValue } from '../../utils/use-props-value';
var classPrefix = "adm-tree-select";
var defaultProps = {
  options: [],
  fieldNames: {},
  defaultValue: []
};
export var TreeSelect = function TreeSelect(p) {
  var props = mergeProps(defaultProps, p);
  var labelName = props.fieldNames.label || 'label';
  var valueName = props.fieldNames.value || 'value';
  var childrenName = props.fieldNames.children || 'children';

  var _usePropsValue = usePropsValue({
    value: props.value,
    defaultValue: props.defaultValue
  }),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var _useMemo = useMemo(function () {
    var deep = getTreeDeep(props.options, childrenName);
    var optionsMap = new Map();
    var optionsParentMap = new Map();

    function traverse(current, children) {
      children.forEach(function (item) {
        optionsParentMap.set(item[valueName], current);
        optionsMap.set(item[valueName], item);

        if (item[childrenName]) {
          traverse(item, item[childrenName]);
        }
      });
    }

    traverse(undefined, props.options);
    return [deep, optionsMap, optionsParentMap];
  }, [props.options]),
      deep = _useMemo[0],
      optionsMap = _useMemo[1],
      optionsParentMap = _useMemo[2];

  var onItemSelect = function onItemSelect(node) {
    var _a; // 找到父级节点


    var parentNodes = [];
    var current = node;

    while (current) {
      parentNodes.unshift(current);
      var next = optionsParentMap.get(current[valueName]);
      current = next;
    }

    var values = parentNodes.map(function (i) {
      return i[valueName];
    });
    setValue(values);
    (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, values, {
      options: parentNodes
    });
  };

  var renderItems = function renderItems(columnOptions, index) {
    if (columnOptions === void 0) {
      columnOptions = [];
    }

    return columnOptions.map(function (item) {
      var _classNames;

      var isActive = item[valueName] === value[index];
      return /*#__PURE__*/React.createElement("div", {
        key: item[valueName],
        className: classNames(classPrefix + "-item", (_classNames = {}, _classNames[classPrefix + "-item-active"] = isActive, _classNames)),
        onClick: function onClick() {
          if (!isActive) {
            onItemSelect(item);
          }
        }
      }, item[labelName]);
    });
  };

  var renderColumns = function renderColumns() {
    var _a;

    var columns = [];

    for (var i = 0; i < deep; i++) {
      var width = 100 / deep + "%"; // 两列的第一列宽度为 33.33，两列的第二列为 66.67%

      if (deep === 2 && i === 0) {
        width = "33.33%";
      }

      if (deep === 2 && i === 1) {
        width = "66.67%";
      }

      var column = /*#__PURE__*/React.createElement("div", {
        key: i,
        className: classNames(classPrefix + "-column"),
        style: {
          width: width
        }
      }, renderItems(i === 0 ? props.options : (_a = optionsMap.get(value[i - 1])) === null || _a === void 0 ? void 0 : _a[childrenName], i));
      columns.push(column);
    }

    return columns;
  };

  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classPrefix
  }, renderColumns()));
};