"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CascaderView = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _tabs = _interopRequireDefault(require("../tabs"));

var _checkList = _interopRequireDefault(require("../check-list"));

var _nativeProps = require("../../utils/native-props");

var _withDefaultProps = require("../../utils/with-default-props");

var _usePropsValue2 = require("../../utils/use-props-value");

var _useCascaderValueExtend = require("./use-cascader-value-extend");

var _configProvider = require("../config-provider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var classPrefix = "adm-cascader-view";
var defaultProps = {
  defaultValue: []
};

var CascaderView = function CascaderView(p) {
  var _useConfig = (0, _configProvider.useConfig)(),
      locale = _useConfig.locale;

  var props = (0, _withDefaultProps.mergeProps)(defaultProps, {
    placeholder: locale.Cascader.placeholder
  }, p);

  var _usePropsValue = (0, _usePropsValue2.usePropsValue)(Object.assign(Object.assign({}, props), {
    onChange: function onChange(val) {
      var _a;

      (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, val, generateValueExtend(val));
    }
  })),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var _useState = (0, _react.useState)(0),
      tabActiveKey = _useState[0],
      setTabActiveKey = _useState[1];

  var generateValueExtend = (0, _useCascaderValueExtend.useCascaderValueExtend)(props.options);
  var levels = (0, _react.useMemo)(function () {
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
  (0, _react.useEffect)(function () {
    setTabActiveKey(levels.length - 1);
  }, [value]);

  var onItemSelect = function onItemSelect(selectValue, depth) {
    var next = value.slice(0, depth);

    if (selectValue !== undefined) {
      next[depth] = selectValue;
    }

    setValue(next);
  };

  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix
  }, /*#__PURE__*/_react["default"].createElement(_tabs["default"], {
    activeKey: tabActiveKey.toString(),
    onChange: function onChange(key) {
      return setTabActiveKey(parseInt(key));
    },
    stretch: false,
    className: classPrefix + "-tabs"
  }, levels.map(function (level, index) {
    var selected = level.selected;
    return /*#__PURE__*/_react["default"].createElement(_tabs["default"].Tab, {
      key: index,
      title: /*#__PURE__*/_react["default"].createElement("div", {
        className: classPrefix + "-header-title"
      }, selected ? selected.label : props.placeholder),
      forceRender: true
    }, /*#__PURE__*/_react["default"].createElement(_checkList["default"], {
      value: [value[index]],
      onChange: function onChange(selectValue) {
        return onItemSelect(selectValue[0], index);
      },
      className: classPrefix + "-content"
    }, level.options.map(function (option) {
      var _classNames;

      var active = value[index] === option.value;
      return /*#__PURE__*/_react["default"].createElement(_checkList["default"].Item, {
        value: option.value,
        key: option.value,
        disabled: option.disabled,
        className: (0, _classnames["default"])(classPrefix + "-item", (_classNames = {}, _classNames[classPrefix + "-item-active"] = active, _classNames))
      }, option.label);
    })));
  }))));
};

exports.CascaderView = CascaderView;