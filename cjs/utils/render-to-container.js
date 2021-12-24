"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderToContainer = renderToContainer;

var _reactDom = require("react-dom");

var _getContainer = require("./get-container");

var _canUseDom = require("./can-use-dom");

function renderToContainer(getContainer, node) {
  if (_canUseDom.canUseDom && getContainer) {
    var container = (0, _getContainer.resolveContainer)(getContainer);
    return /*#__PURE__*/(0, _reactDom.createPortal)(node, container);
  }

  return node;
}