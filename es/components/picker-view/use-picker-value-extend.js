import { useMemo } from 'react';
import memoize from 'lodash/memoize';
export function usePickerValueExtend(columns) {
  var generateItems = useMemo(function () {
    return memoize(function (val) {
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