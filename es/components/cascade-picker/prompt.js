import { CascadePicker } from './cascade-picker';
import React, { useEffect, useState } from 'react';
import { renderToBody } from '../../utils/render-to-body';
export function prompt(props) {
  return new Promise(resolve => {
    const Wrapper = () => {
      const [visible, setVisible] = useState(false);
      useEffect(() => {
        setVisible(true);
      }, []);
      return React.createElement(CascadePicker, Object.assign({}, props, {
        visible: visible,
        onConfirm: (val, extend) => {
          var _a;

          (_a = props.onConfirm) === null || _a === void 0 ? void 0 : _a.call(props, val, extend);
          resolve(val);
        },
        onClose: () => {
          var _a;

          (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
          setVisible(false);
          resolve(null);
        },
        afterClose: () => {
          var _a;

          (_a = props.afterClose) === null || _a === void 0 ? void 0 : _a.call(props);
          unmount();
        }
      }));
    };

    const unmount = renderToBody(React.createElement(Wrapper, null));
  });
}