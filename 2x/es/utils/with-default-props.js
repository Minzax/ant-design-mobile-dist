import assign from 'lodash/assign';
import assignWith from 'lodash/assignWith';
import isUndefined from 'lodash/isUndefined';
export function mergeProps() {
  function customizer(objValue, srcValue) {
    return isUndefined(srcValue) ? objValue : srcValue;
  }

  var ret = assign({}, arguments.length <= 0 ? undefined : arguments[0]);

  for (var i = 1; i < arguments.length; i++) {
    ret = assignWith(ret, i < 0 || arguments.length <= i ? undefined : arguments[i], customizer);
  }

  return ret;
}