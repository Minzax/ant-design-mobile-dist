"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScrollParent = getScrollParent;

var _canUseDom = require("./can-use-dom");

const overflowScrollReg = /scroll|auto|overlay/i;
const defaultRoot = _canUseDom.canUseDom ? window : undefined;

function isElement(node) {
  const ELEMENT_NODE_TYPE = 1;
  return node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === ELEMENT_NODE_TYPE;
} // https://github.com/youzan/vant/issues/3823


function getScrollParent(el, root = defaultRoot) {
  let node = el;

  while (node && node !== root && isElement(node)) {
    const {
      overflowY
    } = window.getComputedStyle(node);

    if (overflowScrollReg.test(overflowY)) {
      return node;
    }

    node = node.parentNode;
  }

  return root;
}