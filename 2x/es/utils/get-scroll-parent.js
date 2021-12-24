import { canUseDom } from './can-use-dom';
var overflowScrollReg = /scroll|auto/i;
var defaultRoot = canUseDom ? window : undefined;

function isElement(node) {
  var ELEMENT_NODE_TYPE = 1;
  return node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === ELEMENT_NODE_TYPE;
} // https://github.com/youzan/vant/issues/3823


export function getScrollParent(el, root) {
  if (root === void 0) {
    root = defaultRoot;
  }

  var node = el;

  while (node && node !== root && isElement(node)) {
    var _window$getComputedSt = window.getComputedStyle(node),
        overflowY = _window$getComputedSt.overflowY;

    if (overflowScrollReg.test(overflowY)) {
      return node;
    }

    node = node.parentNode;
  }

  return root;
}