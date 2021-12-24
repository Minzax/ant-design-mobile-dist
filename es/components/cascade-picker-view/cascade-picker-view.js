var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import React from 'react';
import PickerView from '../picker-view';
import { useCascadePickerOptions } from '../cascade-picker/use-cascade-picker-options';
import { generateCascadePickerColumns } from '../cascade-picker/cascade-picker-utils';
export var CascadePickerView = function CascadePickerView(props) {
  var options = props.options,
      pickerProps = __rest(props, ["options"]);

  var _useCascadePickerOpti = useCascadePickerOptions(options),
      depth = _useCascadePickerOpti.depth,
      subOptionsRecord = _useCascadePickerOpti.subOptionsRecord;

  return /*#__PURE__*/React.createElement(PickerView, Object.assign({}, pickerProps, {
    columns: function columns(selected) {
      return generateCascadePickerColumns(selected, options, depth, subOptionsRecord);
    }
  }));
};