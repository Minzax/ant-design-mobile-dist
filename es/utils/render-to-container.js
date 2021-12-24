import { createPortal } from 'react-dom';
import { resolveContainer } from './get-container';
import { canUseDom } from './can-use-dom';
export function renderToContainer(getContainer, node) {
  if (canUseDom && getContainer) {
    var container = resolveContainer(getContainer);
    return /*#__PURE__*/createPortal(node, container);
  }

  return node;
}