"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoStyleItemContext = exports.FormContext = exports.DEFAULT_FORM_CONTEXT = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DEFAULT_FORM_CONTEXT = {
  hasFeedback: true,
  layout: 'vertical'
};
exports.DEFAULT_FORM_CONTEXT = DEFAULT_FORM_CONTEXT;

const FormContext = _react.default.createContext(DEFAULT_FORM_CONTEXT);

exports.FormContext = FormContext;

const NoStyleItemContext = _react.default.createContext(null);

exports.NoStyleItemContext = NoStyleItemContext;