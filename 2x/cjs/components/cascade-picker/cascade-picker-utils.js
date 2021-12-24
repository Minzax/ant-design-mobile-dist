"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateCascadePickerColumns = generateCascadePickerColumns;

function generateCascadePickerColumns(value, options, depth, subOptionsRecord) {
  var columns = [];
  columns.push(options.map(function (option) {
    return {
      label: option.label,
      value: option.value
    };
  }));

  for (var i = 0; i < depth - 1; i++) {
    var x = value[i];
    var subOptions = subOptionsRecord[x];

    if (!subOptions) {
      columns.push([]);
    } else {
      columns.push(subOptions.map(function (option) {
        return {
          label: option.label,
          value: option.value
        };
      }));
    }
  }

  return columns;
}