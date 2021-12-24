"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cascader = require("./cascader");

var _prompt = require("./prompt");

var _attachPropertiesToComponent = require("../../utils/attach-properties-to-component");

require("./cascader.css");

var _default = (0, _attachPropertiesToComponent.attachPropertiesToComponent)(_cascader.Cascader, {
  prompt: _prompt.prompt
});

exports["default"] = _default;