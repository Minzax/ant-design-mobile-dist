"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormImperativeItem = void 0;

var _react = _interopRequireWildcard(require("react"));

var _formItem = require("./form-item");

var _datePicker = _interopRequireDefault(require("../date-picker"));

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

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var Inner = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      trigger: function trigger() {
        return __awaiter(void 0, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var _a, v;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _datePicker["default"].prompt({
                    defaultValue: props.value
                  });

                case 2:
                  v = _context.sent;

                  if (v !== null) {
                    (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, v);
                  }

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
      }
    };
  });
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, props.renderValue(props.value));
});

var FormImperativeItem = function FormImperativeItem(props) {
  var renderValue = props.renderValue,
      formItemProps = __rest(props, ["renderValue"]);

  var ref = (0, _react.useRef)(null);
  return /*#__PURE__*/_react["default"].createElement(_formItem.FormItem, Object.assign({}, formItemProps, {
    onClick: function onClick() {
      var _a;

      (_a = ref.current) === null || _a === void 0 ? void 0 : _a.trigger();
    }
  }), /*#__PURE__*/_react["default"].createElement(Inner, {
    ref: ref,
    renderValue: renderValue
  }));
};

exports.FormImperativeItem = FormImperativeItem;