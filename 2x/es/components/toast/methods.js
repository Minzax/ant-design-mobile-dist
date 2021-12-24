import React, { useEffect, useState } from 'react';
import { resolveContainer } from '../../utils/get-container';
import ReactDOM from 'react-dom';
import { InternalToast } from './toast';
import { mergeProps } from '../../utils/with-default-props';
var containers = [];

function unmount(container) {
  var unmountResult = ReactDOM.unmountComponentAtNode(container);

  if (unmountResult && container.parentNode) {
    container.parentNode.removeChild(container);
  }
}

var defaultProps = {
  duration: 2000,
  position: 'center',
  maskClickable: true
};
export function show(p) {
  var props = mergeProps(defaultProps, typeof p === 'string' ? {
    content: p
  } : p);
  var timer = 0;
  var _props$getContainer = props.getContainer,
      getContainer = _props$getContainer === void 0 ? function () {
    return document.body;
  } : _props$getContainer;
  var container = document.createElement('div');
  var bodyContainer = resolveContainer(getContainer);
  bodyContainer.appendChild(container);
  clear();
  containers.push(container);

  var TempToast = function TempToast() {
    var _useState = useState(true),
        visible = _useState[0],
        setVisible = _useState[1];

    useEffect(function () {
      return function () {
        var _a;

        (_a = props.afterClose) === null || _a === void 0 ? void 0 : _a.call(props);
      };
    }, []);
    useEffect(function () {
      if (props.duration === 0) {
        return;
      }

      timer = window.setTimeout(function () {
        setVisible(false);
      }, props.duration);
      return function () {
        window.clearTimeout(timer);
      };
    }, []);
    return /*#__PURE__*/React.createElement(InternalToast, Object.assign({}, props, {
      getContainer: function getContainer() {
        return container;
      },
      visible: visible,
      afterClose: function afterClose() {
        unmount(container);
      }
    }));
  };

  ReactDOM.render( /*#__PURE__*/React.createElement(TempToast, null), container);
}
export function clear() {
  while (true) {
    var container = containers.pop();
    if (!container) break;
    unmount(container);
  }
}
export function config(val) {
  if (val.duration !== undefined) {
    defaultProps.duration = val.duration;
  }

  if (val.position !== undefined) {
    defaultProps.position = val.position;
  }

  if (val.maskClickable !== undefined) {
    defaultProps.maskClickable = val.maskClickable;
  }
}