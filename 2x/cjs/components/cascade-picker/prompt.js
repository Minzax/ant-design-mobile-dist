"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompt = prompt;

var _cascadePicker = require("./cascade-picker");

var _react = _interopRequireWildcard(require("react"));

var _renderToBody = require("../../utils/render-to-body");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function prompt(props) {
  return new Promise(function (resolve) {
    var Wrapper = function Wrapper() {
      var _useState = (0, _react.useState)(false),
          visible = _useState[0],
          setVisible = _useState[1];

      (0, _react.useEffect)(function () {
        setVisible(true);
      }, []);
      return /*#__PURE__*/_react["default"].createElement(_cascadePicker.CascadePicker, Object.assign({}, props, {
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

    var unmount = (0, _renderToBody.renderToBody)( /*#__PURE__*/_react["default"].createElement(Wrapper, null));
  });
}