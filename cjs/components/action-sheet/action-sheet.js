"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionSheet = void 0;
exports.showActionSheet = showActionSheet;

var _react = _interopRequireWildcard(require("react"));

var _nativeProps = require("../../utils/native-props");

var _withDefaultProps = require("../../utils/with-default-props");

var _classnames = _interopRequireDefault(require("classnames"));

var _popup = _interopRequireDefault(require("../popup"));

var _button = _interopRequireDefault(require("../button"));

var _renderToBody = require("../../utils/render-to-body");

var _safeArea = _interopRequireDefault(require("../safe-area"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var classPrefix = "adm-action-sheet";
var defaultProps = {
  visible: false,
  actions: [],
  cancelText: '',
  closeOnAction: false,
  closeOnMaskClick: true,
  safeArea: true
};

var ActionSheet = function ActionSheet(p) {
  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  return /*#__PURE__*/_react["default"].createElement(_popup["default"], {
    visible: props.visible,
    onMaskClick: function onMaskClick() {
      var _a, _b;

      (_a = props.onMaskClick) === null || _a === void 0 ? void 0 : _a.call(props);

      if (props.closeOnMaskClick) {
        (_b = props.onClose) === null || _b === void 0 ? void 0 : _b.call(props);
      }
    },
    afterClose: props.afterClose,
    className: classPrefix + "-popup",
    getContainer: props.getContainer
  }, (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix
  }, props.extra && /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-extra"
  }, props.extra), /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-button-list"
  }, props.actions.map(function (action, index) {
    var _classNames;

    return /*#__PURE__*/_react["default"].createElement("div", {
      key: action.key,
      className: classPrefix + "-button-item-wrapper"
    }, /*#__PURE__*/_react["default"].createElement(_button["default"], {
      block: true,
      fill: 'none',
      disabled: action.disabled,
      onClick: function onClick() {
        var _a, _b, _c;

        (_a = action.onClick) === null || _a === void 0 ? void 0 : _a.call(action);
        (_b = props.onAction) === null || _b === void 0 ? void 0 : _b.call(props, action, index);

        if (props.closeOnAction) {
          (_c = props.onClose) === null || _c === void 0 ? void 0 : _c.call(props);
        }
      },
      className: (0, _classnames["default"])(classPrefix + "-button-item", (_classNames = {}, _classNames[classPrefix + "-button-item-danger"] = action.danger, _classNames))
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: classPrefix + "-button-item-name"
    }, action.text), action.description && /*#__PURE__*/_react["default"].createElement("div", {
      className: classPrefix + "-button-item-description"
    }, action.description)));
  })), props.cancelText && /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-cancel"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-button-item-wrapper"
  }, /*#__PURE__*/_react["default"].createElement(_button["default"], {
    block: true,
    fill: 'none',
    className: classPrefix + "-button-item",
    onClick: function onClick() {
      var _a;

      (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-button-item-name"
  }, props.cancelText)))), props.safeArea && /*#__PURE__*/_react["default"].createElement(_safeArea["default"], {
    position: 'bottom'
  }))));
};

exports.ActionSheet = ActionSheet;

function showActionSheet(props) {
  var Wrapper = /*#__PURE__*/(0, _react.forwardRef)(function (_, ref) {
    var _useState = (0, _react.useState)(false),
        visible = _useState[0],
        setVisible = _useState[1];

    (0, _react.useEffect)(function () {
      setVisible(true);
    }, []);

    function handleClose() {
      var _a;

      (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
      setVisible(false);
    }

    (0, _react.useImperativeHandle)(ref, function () {
      return {
        close: handleClose
      };
    });
    return /*#__PURE__*/_react["default"].createElement(ActionSheet, Object.assign({}, props, {
      visible: visible,
      onClose: handleClose,
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
  return {
    close: function close() {
      var _a;

      (_a = ref.current) === null || _a === void 0 ? void 0 : _a.close();
    }
  };
}