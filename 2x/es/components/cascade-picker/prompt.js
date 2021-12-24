import { CascadePicker } from './cascade-picker';
import React, { useEffect, useState } from 'react';
import { renderToBody } from '../../utils/render-to-body';
export function prompt(props) {
  return new Promise(function (resolve) {
    var Wrapper = function Wrapper() {
      var _useState = useState(false),
          visible = _useState[0],
          setVisible = _useState[1];

      useEffect(function () {
        setVisible(true);
      }, []);
      return /*#__PURE__*/React.createElement(CascadePicker, Object.assign({}, props, {
        visible: visible,
        onConfirm: function onConfirm(val) {
          resolve(val);
        },
        onClose: function onClose() {
          var _a;

          (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
          setVisible(false);
          resolve(null);
        },
        afterClose: function afterClose() {
          var _a;

          (_a = props.afterClose) === null || _a === void 0 ? void 0 : _a.call(props);
          unmount();
        }
      }));
    };

    var unmount = renderToBody( /*#__PURE__*/React.createElement(Wrapper, null));
  });
}