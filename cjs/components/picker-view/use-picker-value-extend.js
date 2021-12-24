"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePickerValueExtend = usePickerValueExtend;

var _react = require("react");

var _memoize = _interopRequireDefault(require("lodash/memoize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function usePickerValueExtend(columns) {
  var generateItems = (0, _react.useMemo)(function () {
    return (0, _memoize["default"])(function (val) {
      return val.map(function (v, index) {
        var _a;

        var column = columns[index];
        if (!column) return null;
        return (_a = column.find(function (item) {
          return item.value === v;
        })) !== null && _a !== void 0 ? _a : null;
      });
    }, function (val) {
      return JSON.stringify(val);
    });
  }, [columns]);

  function generateValueExtend(val) {
    return {
      get items() {
        return generateItems(val);
      }

    };
  }

  return generateValueExtend;
}