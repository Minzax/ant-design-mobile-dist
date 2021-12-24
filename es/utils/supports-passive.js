import { canUseDom } from './can-use-dom';
export var supportsPassive = false;

if (canUseDom) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        supportsPassive = true;
      }
    });
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}