import { show } from './show';
import { mergeProps } from '../../utils/with-default-props';
import { getDefaultConfig } from '../config-provider';
export function alert(p) {
  var defaultProps = {
    confirmText: getDefaultConfig().locale.Modal.ok
  };
  var props = mergeProps(defaultProps, p);
  return new Promise(function (resolve) {
    show(Object.assign(Object.assign({}, props), {
      closeOnAction: true,
      actions: [{
        key: 'confirm',
        text: props.confirmText,
        primary: true
      }],
      onAction: props.onConfirm,
      onClose: function onClose() {
        resolve();
      }
    }));
  });
}