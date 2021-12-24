import React, { createRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { renderToBody } from '../../utils/render-to-body';
import { ImageViewer, MultiImageViewer } from './image-viewer';
import { useUnmountedRef } from 'ahooks';
var handlerSet = new Set();
export function showImageViewer(props) {
  clearImageViewer();
  var Wrapper = /*#__PURE__*/forwardRef(function (_, ref) {
    var _useState = useState(false),
        visible = _useState[0],
        setVisible = _useState[1];

    useEffect(function () {
      setVisible(true);
    }, []);
    var isUnmountedRef = useUnmountedRef();
    useImperativeHandle(ref, function () {
      return {
        close: function close() {
          if (isUnmountedRef.current) return;
          setVisible(false);
        }
      };
    });
    return /*#__PURE__*/React.createElement(ImageViewer, Object.assign({}, props, {
      visible: visible,
      onClose: function onClose() {
        var _a;

        (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
        setVisible(false);
      },
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
  var handler = {
    close: function close() {
      var _a;

      (_a = ref.current) === null || _a === void 0 ? void 0 : _a.close();
    }
  };
  handlerSet.add(handler);
  return handler;
}
export function showMultiImageViewer(props) {
  clearImageViewer();
  var Wrapper = /*#__PURE__*/forwardRef(function (_, ref) {
    var _useState2 = useState(false),
        visible = _useState2[0],
        setVisible = _useState2[1];

    useEffect(function () {
      setVisible(true);
    }, []);
    var isUnmountedRef = useUnmountedRef();
    useImperativeHandle(ref, function () {
      return {
        close: function close() {
          if (isUnmountedRef.current) return;
          setVisible(false);
        }
      };
    });
    return /*#__PURE__*/React.createElement(MultiImageViewer, Object.assign({}, props, {
      visible: visible,
      onClose: function onClose() {
        var _a;

        (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
        setVisible(false);
      },
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
  var handler = {
    close: function close() {
      var _a;

      (_a = ref.current) === null || _a === void 0 ? void 0 : _a.close();
    }
  };
  handlerSet.add(handler);
  return handler;
}
export function clearImageViewer() {
  handlerSet.forEach(function (handler) {
    handler.close();
  });
  handlerSet.clear();
}