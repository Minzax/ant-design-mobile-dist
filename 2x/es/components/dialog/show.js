import React, { createRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { renderToBody } from '../../utils/render-to-body';
import { Dialog } from './dialog';
export function show(props) {
  var Wrapper = /*#__PURE__*/forwardRef(function (_, ref) {
    var _useState = useState(false),
        visible = _useState[0],
        setVisible = _useState[1];

    useEffect(function () {
      setVisible(true);
    }, []);

    function handleClose() {
      var _a;

      (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
      setVisible(false);
    }

    useImperativeHandle(ref, function () {
      return {
        close: handleClose
      };
    });
    return /*#__PURE__*/React.createElement(Dialog, Object.assign({}, props, {
      visible: visible,
      onClose: handleClose,
      afterClose: function afterClose() {
        var _a;

        (_a = props.afterClose) === null || _a === void 0 ? void 0 : _a.call(props);
        unmount();
      }
    }));
  });
  var ref = /*#__PURE__*/createRef();
  var unmount = renderToBody( /*#__PURE__*/React.createElement(Wrapper, {
    ref: ref
  }));
  return {
    close: function close() {
      var _a;

      (_a = ref.current) === null || _a === void 0 ? void 0 : _a.close();
    }
  };
}