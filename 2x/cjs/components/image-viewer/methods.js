"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearImageViewer = clearImageViewer;
exports.showImageViewer = showImageViewer;
exports.showMultiImageViewer = showMultiImageViewer;

var _react = _interopRequireWildcard(require("react"));

var _renderToBody = require("../../utils/render-to-body");

var _imageViewer = require("./image-viewer");

var _ahooks = require("ahooks");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var handlerSet = new Set();

function showImageViewer(props) {
  clearImageViewer();
  var Wrapper = /*#__PURE__*/(0, _react.forwardRef)(function (_, ref) {
    var _useState = (0, _react.useState)(false),
        visible = _useState[0],
        setVisible = _useState[1];

    (0, _react.useEffect)(function () {
      setVisible(true);
    }, []);
    var isUnmountedRef = (0, _ahooks.useUnmountedRef)();
    (0, _react.useImperativeHandle)(ref, function () {
      return {
        close: function close() {
          if (isUnmountedRef.current) return;
          setVisible(false);
        }
      };
    });
    return /*#__PURE__*/_react["default"].createElement(_imageViewer.ImageViewer, Object.assign({}, props, {
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
  var ref = /*#__PURE__*/(0, _react.createRef)();
  var unmount = (0, _renderToBody.renderToBody)( /*#__PURE__*/_react["default"].createElement(Wrapper, {
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

function showMultiImageViewer(props) {
  clearImageViewer();
  var Wrapper = /*#__PURE__*/(0, _react.forwardRef)(function (_, ref) {
    var _useState2 = (0, _react.useState)(false),
        visible = _useState2[0],
        setVisible = _useState2[1];

    (0, _react.useEffect)(function () {
      setVisible(true);
    }, []);
    var isUnmountedRef = (0, _ahooks.useUnmountedRef)();
    (0, _react.useImperativeHandle)(ref, function () {
      return {
        close: function close() {
          if (isUnmountedRef.current) return;
          setVisible(false);
        }
      };
    });
    return /*#__PURE__*/_react["default"].createElement(_imageViewer.MultiImageViewer, Object.assign({}, props, {
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
  var ref = /*#__PURE__*/(0, _react.createRef)();
  var unmount = (0, _renderToBody.renderToBody)( /*#__PURE__*/_react["default"].createElement(Wrapper, {
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

function clearImageViewer() {
  handlerSet.forEach(function (handler) {
    handler.close();
  });
  handlerSet.clear();
}