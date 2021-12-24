"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Multiple = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _nativeProps = require("../../utils/native-props");

var _tree = require("../../utils/tree");

var _withDefaultProps = require("../../utils/with-default-props");

var _checkbox = _interopRequireDefault(require("../checkbox"));

var _usePropsValue3 = require("../../utils/use-props-value");

var _devLog = require("../../utils/dev-log");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classPrefix = "adm-tree-select-multiple";

var Multiple = function Multiple(p) {
  var props = (0, _withDefaultProps.mergeProps)({
    options: [],
    fieldNames: {},
    allSelectText: [],
    defaultExpandKeys: [],
    defaultValue: []
  }, p);
  (0, _react.useEffect)(function () {
    (0, _devLog.devWarning)('TreeSelect', 'TreeSelect.Multiple has been deprecated.');
  }, []);
  var labelName = props.fieldNames.label || 'label';
  var valueName = props.fieldNames.value || 'value';
  var childrenName = props.fieldNames.children || 'children'; // 打开的 keys

  var _usePropsValue = (0, _usePropsValue3.usePropsValue)({
    value: props.expandKeys,
    defaultValue: props.defaultExpandKeys
  }),
      expandKeys = _usePropsValue[0],
      setExpandKeys = _usePropsValue[1]; // 选中的 value（聚合后）


  var _usePropsValue2 = (0, _usePropsValue3.usePropsValue)({
    value: props.value,
    defaultValue: props.defaultValue
  }),
      value = _usePropsValue2[0],
      setValue = _usePropsValue2[1]; // 获取目标所有叶子节点 key 集合


  var getLeafKeys = function getLeafKeys(option) {
    var keys = [];

    var walker = function walker(op) {
      var _a;

      if (!op) {
        return;
      }

      if ((_a = op[childrenName]) === null || _a === void 0 ? void 0 : _a.length) {
        op[childrenName].forEach(function (i) {
          return walker(i);
        });
      } else {
        keys.push(op[valueName]);
      }
    };

    walker(option);
    return keys;
  };

  var _useMemo = (0, _react.useMemo)(function () {
    var deep = (0, _tree.getTreeDeep)(props.options, childrenName);
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
      optionsParentMap = _useMemo[2]; // 将聚合的 value 拆分开，获得叶子节点的 value 集合


  var allSelectedLeafKeys = (0, _react.useMemo)(function () {
    var leafKeys = [];
    value.forEach(function (v) {
      var option = optionsMap.get(v);
      leafKeys = leafKeys.concat(getLeafKeys(option));
    });
    return leafKeys;
  }, [value, optionsMap]); // 子级有被选中的节点集合

  var dotMap = (0, _react.useMemo)(function () {
    var map = new Map(); // 遍历 allChildrenValues, 向上递归

    var walker = function walker(key) {
      var parentOption = optionsParentMap.get(key);

      if (!parentOption) {
        return;
      }

      map.set(parentOption[valueName], true);
      walker(parentOption[valueName]);
    };

    allSelectedLeafKeys.forEach(function (key) {
      map.set(key, true);
      walker(key);
    });
    return map;
  }, [optionsParentMap, value]);

  var onChange = function onChange(targetKeys) {
    var _a;

    var groupKeys = [].concat(targetKeys);
    var unusedKeys = [];

    var walker = function walker(keys) {
      keys.forEach(function (key) {
        var _a;

        if (unusedKeys.includes(key)) {
          return;
        }

        var parent = optionsParentMap.get(key);

        if (!parent) {
          return;
        }

        var childrenKeys = ((_a = parent[childrenName]) === null || _a === void 0 ? void 0 : _a.map(function (i) {
          return i[valueName];
        })) || [];

        if (childrenKeys.every(function (i) {
          return groupKeys.includes(i);
        })) {
          groupKeys.push(parent[valueName]);
          unusedKeys = unusedKeys.concat(childrenKeys);
        }
      });
    }; // 遍历 deep 次 groupKeys，每次往上聚合一层


    for (var i = 0; i < deep; i++) {
      walker(groupKeys);
    }

    groupKeys = groupKeys.filter(function (i) {
      return !unusedKeys.includes(i);
    });
    var groupOptions = groupKeys.map(function (i) {
      return optionsMap.get(i);
    });
    setValue(groupKeys);
    (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, groupKeys, groupOptions);
  };

  var onItemSelect = function onItemSelect(option) {
    var _a;

    var parentNodes = [];
    var current = option;

    while (current) {
      parentNodes.unshift(current);
      var next = optionsParentMap.get(current[valueName]);
      current = next;
    }

    var keys = parentNodes.map(function (i) {
      return i[valueName];
    });
    setExpandKeys(keys);
    (_a = props.onExpand) === null || _a === void 0 ? void 0 : _a.call(props, keys, parentNodes);
  }; // 渲染全选节点


  var renderSelectAllItem = function renderSelectAllItem(columnOptions, index) {
    var _a;

    var text = (_a = props.selectAllText) === null || _a === void 0 ? void 0 : _a[index];

    if (!text) {
      return;
    }

    var currentLeafKeys = [];
    columnOptions.forEach(function (option) {
      currentLeafKeys = currentLeafKeys.concat(getLeafKeys(option));
    });
    var allSelected = currentLeafKeys.every(function (i) {
      return allSelectedLeafKeys.includes(i);
    });
    return /*#__PURE__*/_react["default"].createElement("div", {
      onClick: function onClick() {
        if (allSelected) {
          onChange(allSelectedLeafKeys.filter(function (i) {
            return !currentLeafKeys.includes(i);
          }));
        } else {
          onChange(allSelectedLeafKeys.concat(currentLeafKeys));
        }
      },
      className: classPrefix + "-item"
    }, text);
  }; // 渲染


  var renderSelectAllLeafItem = function renderSelectAllLeafItem(columnOptions, index) {
    var _a;

    var text = (_a = props.selectAllText) === null || _a === void 0 ? void 0 : _a[index];

    if (!text) {
      return;
    }

    var currentLeafKeys = columnOptions.map(function (i) {
      return i[valueName];
    });
    var allSelected = currentLeafKeys.every(function (i) {
      return allSelectedLeafKeys.includes(i);
    });
    var halfSelected = allSelected ? false : currentLeafKeys.some(function (i) {
      return allSelectedLeafKeys.includes(i);
    });
    return /*#__PURE__*/_react["default"].createElement("div", {
      onClick: function onClick() {
        if (allSelected) {
          onChange(allSelectedLeafKeys.filter(function (i) {
            return !currentLeafKeys.includes(i);
          }));
        } else {
          onChange(allSelectedLeafKeys.concat(currentLeafKeys));
        }
      },
      className: (0, _classnames["default"])(classPrefix + "-item", classPrefix + "-item-leaf")
    }, /*#__PURE__*/_react["default"].createElement(_checkbox["default"], {
      className: classPrefix + "-item-checkbox",
      checked: allSelected,
      indeterminate: halfSelected
    }), text);
  }; // 渲染节点


  var renderItem = function renderItem(option) {
    var _classNames;

    var isExpand = expandKeys.includes(option[valueName]);
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: option[valueName],
      onClick: function onClick() {
        if (!isExpand) {
          onItemSelect(option);
        }
      },
      className: (0, _classnames["default"])(classPrefix + "-item", (_classNames = {}, _classNames[classPrefix + "-item-expand"] = isExpand, _classNames))
    }, option[labelName], !!dotMap.get(option[valueName]) && /*#__PURE__*/_react["default"].createElement("div", {
      className: classPrefix + "-dot"
    }));
  }; // 渲染叶子节点


  var renderLeafItem = function renderLeafItem(option) {
    var isSelected = allSelectedLeafKeys.includes(option[valueName]);
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: option[valueName],
      onClick: function onClick() {
        if (isSelected) {
          onChange(allSelectedLeafKeys.filter(function (val) {
            return val !== option[valueName];
          }));
        } else {
          onChange([].concat(allSelectedLeafKeys, [option[valueName]]));
        }
      },
      className: (0, _classnames["default"])(classPrefix + "-item", classPrefix + "-item-leaf")
    }, /*#__PURE__*/_react["default"].createElement(_checkbox["default"], {
      className: classPrefix + "-item-checkbox",
      checked: isSelected
    }), option[labelName]);
  };

  var renderItems = function renderItems(columnOptions, index) {
    if (columnOptions === void 0) {
      columnOptions = [];
    }

    if (columnOptions.length === 0) {
      return;
    }

    var isLeaf = deep === index + 1;

    if (isLeaf) {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, renderSelectAllLeafItem(columnOptions, index), columnOptions.map(function (option) {
        return renderLeafItem(option);
      }));
    }

    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, renderSelectAllItem(columnOptions, index), columnOptions.map(function (option) {
      return renderItem(option);
    }));
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

      var column = /*#__PURE__*/_react["default"].createElement("div", {
        key: i,
        className: (0, _classnames["default"])(classPrefix + "-column"),
        style: {
          width: width
        }
      }, renderItems(i === 0 ? props.options : (_a = optionsMap.get(expandKeys[i - 1])) === null || _a === void 0 ? void 0 : _a[childrenName], i));

      columns.push(column);
    }

    return columns;
  };

  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix
  }, renderColumns()));
};

exports.Multiple = Multiple;