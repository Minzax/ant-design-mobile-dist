"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultFormContext = exports.NoStyleItemContext = exports.FormContext = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultFormContext = {
  name: undefined,
  hasFeedback: true,
  layout: 'vertical',
  requiredMarkStyle: 'asterisk'
};
exports.defaultFormContext = defaultFormContext;

const FormContext = _react.default.createContext(defaultFormContext);

exports.FormContext = FormContext;

const NoStyleItemContext = _react.default.createContext(null);

exports.NoStyleItemContext = NoStyleItemContext;