"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alert = alert;

var _show = require("./show");

var _withDefaultProps = require("../../utils/with-default-props");

var _configProvider = require("../config-provider");

function alert(p) {
  var defaultProps = {
    confirmText: (0, _configProvider.getDefaultConfig)().locale.Dialog.ok
  };
  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  return new Promise(function (resolve) {
    (0, _show.show)(Object.assign(Object.assign({}, props), {
      closeOnAction: true,
      actions: [{
        key: 'confirm',
        text: props.confirmText
      }],
      onAction: props.onConfirm,
      onClose: function onClose() {
        resolve();
      }
    }));
  });
}