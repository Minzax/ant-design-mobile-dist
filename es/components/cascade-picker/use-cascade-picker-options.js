import { useMemo } from 'react';
export function useCascadePickerOptions(options) {
  return useMemo(function () {
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