"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopMenu = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _button = _interopRequireDefault(require("../button"));

var _popover = require("./popover");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var classPrefix = "adm-popover";
var PopMenu = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  var innerRef = (0, _react.useRef)(null);
  (0, _react.useImperativeHandle)(ref, function () {
    return innerRef.current;
  }, []);

  var _onClick = (0, _react.useCallback)(function (e) {
    var _a;

    var onAction = props.onAction;

    if (onAction) {
      onAction(e);
    }

    (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.hide();
  }, [props.onAction]);

  var overlay = (0, _react.useMemo)(function () {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, (props.actions || []).map(function (ele, index) {
      var _classNames;

      var _a;

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(classPrefix + "-inner-menu", (_classNames = {}, _classNames[classPrefix + "-inner-menu-with-icon"] = !!ele.icon, _classNames)),
        key: (_a = ele.key) !== null && _a !== void 0 ? _a : index
      }, /*#__PURE__*/_react["default"].createElement(_button["default"], {
        disabled: ele.disabled,
        onClick: function onClick() {
          var _a;

          if (!ele.disabled) {
            _onClick(ele);

            (_a = ele.onClick) === null || _a === void 0 ? void 0 : _a.call(ele);
          }
        },
        fill: 'none',
        block: true
      }, ele.icon && /*#__PURE__*/_react["default"].createElement("span", {
        className: classPrefix + "-inner-menu-icon"
      }, ele.icon), ele.text));
    }));
  }, [props.actions, _onClick]);
  return /*#__PURE__*/_react["default"].createElement(_popover.Popover, Object.assign({
    ref: innerRef
  }, props, {
    overlayClassName: (0, _classnames["default"])(classPrefix + "-menu", props.overlayClassName),
    content: overlay
  }), props.children);
});
exports.PopMenu = PopMenu;