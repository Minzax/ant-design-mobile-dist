"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeSelect = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _nativeProps = require("../../utils/native-props");

var _tree = require("../../utils/tree");

var _withDefaultProps = require("../../utils/with-default-props");

var _usePropsValue2 = require("../../utils/use-props-value");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classPrefix = "adm-tree-select";
var defaultProps = {
  options: [],
  fieldNames: {},
  defaultValue: []
};

var TreeSelect = function TreeSelect(p) {
  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  var labelName = props.fieldNames.label || 'label';
  var valueName = props.fieldNames.value || 'value';
  var childrenName = props.fieldNames.children || 'children';

  var _usePropsValue = (0, _usePropsValue2.usePropsValue)({
    value: props.value,
    defaultValue: props.defaultValue
  }),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

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
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: item[valueName],
        className: (0, _classnames["default"])(classPrefix + "-item", (_classNames = {}, _classNames[classPrefix + "-item-active"] = isActive, _classNames)),
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

      var column = /*#__PURE__*/_react["default"].createElement("div", {
        key: i,
        className: (0, _classnames["default"])(classPrefix + "-column"),
        style: {
          width: width
        }
      }, renderItems(i === 0 ? props.options : (_a = optionsMap.get(value[i - 1])) === null || _a === void 0 ? void 0 : _a[childrenName], i));

      columns.push(column);
    }

    return columns;
  };

  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix
  }, renderColumns()));
};

exports.TreeSelect = TreeSelect;