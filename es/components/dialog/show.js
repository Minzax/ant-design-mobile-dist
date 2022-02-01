import React, { createRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { renderToBody } from '../../utils/render-to-body';
import { Dialog } from './dialog';
export function show(props) {
  const Wrapper = forwardRef((_, ref) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
      setVisible(true);
    }, []);

    function handleClose() {
      var _a;

      (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
      setVisible(false);
    }

    useImperativeHandle(ref, () => ({
      close: handleClose
    }));
    return React.createElement(Dialog, Object.assign({}, props, {
      visible: visible,
      onClose: handleClose,
      afterClose: () => {
        var _a;

        (_a = props.afterClose) === null || _a === void 0 ? void 0 : _a.call(props);
        unmount();
      }
    }));
  });
  const ref = createRef();
  const unmount = renderToBody(React.createElement(Wrapper, {
    ref: ref
  }));
  return {
    close: () => {
      var _a;

      (_a = ref.current) === null || _a === void 0 ? void 0 : _a.close();
    }
  };
}