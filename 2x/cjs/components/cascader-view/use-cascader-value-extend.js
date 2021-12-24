"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCascaderValueExtend = useCascaderValueExtend;

var _react = require("react");

var _memoize = _interopRequireDefault(require("lodash/memoize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

function useCascaderValueExtend(options) {
  var generateItems = (0, _react.useMemo)(function () {
    return (0, _memoize["default"])(function (val) {
      var ret = [];
      var currentOptions = options;

      var _loop = function _loop() {
        var v = _step.value;
        var target = currentOptions.find(function (option) {
          return option.value === v;
        });

        if (!target) {
          return "break";
        }

        ret.push(target);
        if (!target.children) return "break";
        currentOptions = target.children;
      };

      for (var _iterator = _createForOfIteratorHelperLoose(val), _step; !(_step = _iterator()).done;) {
        var _ret = _loop();

        if (_ret === "break") break;
      }

      return ret;
    }, function (val) {
      return JSON.stringify(val);
    });
  }, [options]);

  function generateValueExtend(val) {
    return {
      get items() {
        return generateItems(val);
      }

    };
  }

  return generateValueExtend;
}