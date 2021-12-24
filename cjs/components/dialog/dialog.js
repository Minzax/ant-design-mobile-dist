"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dialog = void 0;

var _react = _interopRequireWildcard(require("react"));

var _withDefaultProps = require("../../utils/with-default-props");

var _classnames = _interopRequireDefault(require("classnames"));

var _ahooks = require("ahooks");

var _mask = _interopRequireDefault(require("../mask"));

var _dialogActionButton = require("./dialog-action-button");

var _image = _interopRequireDefault(require("../image"));

var _space = _interopRequireDefault(require("../space"));

var _renderToContainer = require("../../utils/render-to-container");

var _withStopPropagation = require("../../utils/with-stop-propagation");

var _autoCenter = _interopRequireDefault(require("../auto-center"));

var _web = require("@react-spring/web");

var _nativeProps = require("../../utils/native-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var classPrefix = "adm-dialog";
var defaultProps = {
  visible: false,
  actions: [],
  closeOnAction: false,
  closeOnMaskClick: false,
  stopPropagation: ['click'],
  getContainer: null
};

var Dialog = function Dialog(p) {
  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  var unmountedRef = (0, _ahooks.useUnmountedRef)();
  var style = (0, _web.useSpring)({
    scale: props.visible ? 1 : 0.8,
    opacity: props.visible ? 1 : 0,
    config: {
      mass: 1,
      tension: 200,
      friction: 30,
      clamp: true
    },
    onStart: function onStart() {
      setActive(true);
    },
    onRest: function onRest() {
      var _a, _b;

      if (unmountedRef.current) return;
      setActive(props.visible);

      if (props.visible) {
        (_a = props.afterShow) === null || _a === void 0 ? void 0 : _a.call(props);
      } else {
        (_b = props.afterClose) === null || _b === void 0 ? void 0 : _b.call(props);
      }
    }
  });

  var _useState = (0, _react.useState)(props.visible),
      active = _useState[0],
      setActive = _useState[1];

  var node = (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix,
    style: {
      display: active ? 'unset' : 'none'
    }
  }, /*#__PURE__*/_react["default"].createElement(_mask["default"], {
    visible: props.visible,
    onMaskClick: props.closeOnMaskClick ? props.onClose : undefined,
    style: props.maskStyle,
    className: (0, _classnames["default"])(classPrefix + "-mask", props.maskClassName)
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-wrap",
    style: {
      pointerEvents: props.visible ? 'unset' : 'none'
    }
  }, /*#__PURE__*/_react["default"].createElement(_web.animated.div, {
    style: Object.assign({}, style),
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    className: classPrefix + "-main"
  }, !!props.image && /*#__PURE__*/_react["default"].createElement(_image["default"], {
    src: props.image,
    alt: 'dialog header image',
    width: '100%'
  }), /*#__PURE__*/_react["default"].createElement("div", {
    style: props.bodyStyle,
    className: (0, _classnames["default"])(classPrefix + "-body", props.bodyClassName)
  }, /*#__PURE__*/_react["default"].createElement(_space["default"], {
    direction: 'vertical',
    block: true
  }, !!props.header && /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-body-header-wrapper"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-body-header"
  }, props.header)), !!props.title && /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-body-title"
  }, props.title), !!props.content && /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-body-content"
  }, typeof props.content === 'string' ? /*#__PURE__*/_react["default"].createElement(_autoCenter["default"], null, props.content) : props.content))), /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-footer"
  }, props.actions.map(function (row, index) {
    var actions = Array.isArray(row) ? row : [row];
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: classPrefix + "-action-row",
      key: index
    }, actions.map(function (action, index) {
      return /*#__PURE__*/_react["default"].createElement(_dialogActionButton.DialogActionButton, {
        key: action.key,
        action: action,
        onAction: function onAction() {
          return __awaiter(void 0, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var _a, _b, _c;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return Promise.all([(_a = action.onClick) === null || _a === void 0 ? void 0 : _a.call(action), (_b = props.onAction) === null || _b === void 0 ? void 0 : _b.call(props, action, index)]);

                  case 2:
                    if (props.closeOnAction) {
                      (_c = props.onClose) === null || _c === void 0 ? void 0 : _c.call(props);
                    }

                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));
        }
      });
    }));
  }))))));
  return (0, _renderToContainer.renderToContainer)(props.getContainer, (0, _withStopPropagation.withStopPropagation)(props.stopPropagation, node));
};

exports.Dialog = Dialog;