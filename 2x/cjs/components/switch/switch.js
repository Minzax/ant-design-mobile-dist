"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Switch = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _spin = _interopRequireDefault(require("../../assets/spin.svg"));

var _nativeProps = require("../../utils/native-props");

var _usePropsValue2 = require("../../utils/use-props-value");

var _withDefaultProps = require("../../utils/with-default-props");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var classPrefix = "adm-switch";
var defaultProps = {
  defaultChecked: false
};

var Switch = function Switch(p) {
  var _classNames;

  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  var disabled = props.disabled || props.loading || false;

  var _useState = (0, _react.useState)(false),
      changing = _useState[0],
      setChanging = _useState[1];

  var _usePropsValue = (0, _usePropsValue2.usePropsValue)({
    value: props.checked,
    defaultValue: props.defaultChecked,
    onChange: props.onChange
  }),
      checked = _usePropsValue[0],
      setChecked = _usePropsValue[1];

  function onClick() {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var nextChecked;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(disabled || props.loading || changing)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              nextChecked = !checked;

              if (!props.beforeChange) {
                _context.next = 18;
                break;
              }

              setChanging(true);
              _context.prev = 5;
              _context.next = 8;
              return props.beforeChange(nextChecked);

            case 8:
              setChecked(nextChecked);
              setChanging(false);
              _context.next = 16;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](5);
              setChanging(false);
              throw _context.t0;

            case 16:
              _context.next = 19;
              break;

            case 18:
              setChecked(nextChecked);

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[5, 12]]);
    }));
  }

  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    onClick: onClick,
    className: (0, _classnames["default"])(classPrefix, (_classNames = {}, _classNames[classPrefix + "-checked"] = checked, _classNames[classPrefix + "-disabled"] = disabled || changing, _classNames))
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-checkbox"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-handle"
  }, (props.loading || changing) && /*#__PURE__*/_react["default"].createElement("img", {
    src: _spin["default"],
    className: classPrefix + "-icon",
    alt: 'switch-handle'
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-inner"
  }, checked ? props.checkedText : props.uncheckedText))));
};

exports.Switch = Switch;