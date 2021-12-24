import { useMemo } from 'react';
export function useColumns(rawColumns, value) {
  return useMemo(function () {
    var columns = typeof rawColumns === 'function' ? rawColumns(value) : rawColumns;
    return columns.map(function (column) {
      return column.map(function (item) {
        return typeof item === 'string' ? {
          label: item,
          value: item
        } : item;
      });
    });
  }, [rawColumns, value]);
}