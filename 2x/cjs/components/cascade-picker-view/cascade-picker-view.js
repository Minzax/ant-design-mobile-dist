"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CascadePickerView = void 0;

var _react = _interopRequireDefault(require("react"));

var _pickerView = _interopRequireDefault(require("../picker-view"));

var _useCascadePickerOptions = require("../cascade-picker/use-cascade-picker-options");

var _cascadePickerUtils = require("../cascade-picker/cascade-picker-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var CascadePickerView = function CascadePickerView(props) {
  var options = props.options,
      pickerProps = __rest(props, ["options"]);

  var _useCascadePickerOpti = (0, _useCascadePickerOptions.useCascadePickerOptions)(options),
      depth = _useCascadePickerOpti.depth,
      subOptionsRecord = _useCascadePickerOpti.subOptionsRecord;

  return /*#__PURE__*/_react["default"].createElement(_pickerView["default"], Object.assign({}, pickerProps, {
    columns: function columns(selected) {
      return (0, _cascadePickerUtils.generateCascadePickerColumns)(selected, options, depth, subOptionsRecord);
    }
  }));
};

exports.CascadePickerView = CascadePickerView;