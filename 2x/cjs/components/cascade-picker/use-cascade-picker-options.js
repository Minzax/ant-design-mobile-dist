"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCascadePickerOptions = useCascadePickerOptions;

var _react = require("react");

function useCascadePickerOptions(options) {
  return (0, _react.useMemo)(function () {
    var depth = 1;
    var subOptionsRecord = {};

    function traverse(option, currentDepth) {
      if (!option.children || option.children.length === 0) {
        return;
      }

      subOptionsRecord[option.value] = option.children;
      var nextDepth = currentDepth + 1;

      if (nextDepth > depth) {
        depth = nextDepth;
      }

      option.children.forEach(function (option) {
        traverse(option, nextDepth);
      });
    }

    options.forEach(function (option) {
      traverse(option, 1);
    });
    return {
      depth: depth,
      subOptionsRecord: subOptionsRecord
    };
  }, [options]);
}