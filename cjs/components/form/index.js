"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("./index.css");

var _form = require("./form");

var _attachPropertiesToComponent = require("../../utils/attach-properties-to-component");

var _formItem = require("./form-item");

var _rcFieldForm = require("rc-field-form");

var _default = (0, _attachPropertiesToComponent.attachPropertiesToComponent)(_form.Form, {
  Item: _formItem.FormItem,
  useForm: _rcFieldForm.useForm
});

exports["default"] = _default;