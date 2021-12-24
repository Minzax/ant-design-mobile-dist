"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clear = clear;
exports.config = config;
exports.show = show;

var _react = _interopRequireWildcard(require("react"));

var _getContainer = require("../../utils/get-container");

var _reactDom = _interopRequireDefault(require("react-dom"));

var _toast = require("./toast");

var _withDefaultProps = require("../../utils/with-default-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var containers = [];

function unmount(container) {
  var unmountResult = _reactDom["default"].unmountComponentAtNode(container);

  if (unmountResult && container.parentNode) {
    container.parentNode.removeChild(container);
  }
}

var defaultProps = {
  duration: 2000,
  position: 'center',
  maskClickable: true
};

function show(p) {
  var props = (0, _withDefaultProps.mergeProps)(defaultProps, typeof p === 'string' ? {
    content: p
  } : p);
  var timer = 0;
  var _props$getContainer = props.getContainer,
      getContainer = _props$getContainer === void 0 ? function () {
    return document.body;
  } : _props$getContainer;
  var container = document.createElement('div');
  var bodyContainer = (0, _getContainer.resolveContainer)(getContainer);
  bodyContainer.appendChild(container);
  clear();
  containers.push(container);

  var TempToast = function TempToast() {
    var _useState = (0, _react.useState)(true),
        visible = _useState[0],
        setVisible = _useState[1];

    (0, _react.useEffect)(function () {
      return function () {
        var _a;

        (_a = props.afterClose) === null || _a === void 0 ? void 0 : _a.call(props);
      };
    }, []);
    (0, _react.useEffect)(function () {
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
    return /*#__PURE__*/_react["default"].createElement(_toast.InternalToast, Object.assign({}, props, {
      getContainer: function getContainer() {
        return container;
      },
      visible: visible,
      afterClose: function afterClose() {
        unmount(container);
      }
    }));
  };

  _reactDom["default"].render( /*#__PURE__*/_react["default"].createElement(TempToast, null), container);
}

function clear() {
  while (true) {
    var container = containers.pop();
    if (!container) break;
    unmount(container);
  }
}

function config(val) {
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