var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
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

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { FormItem } from './form-item';
import DatePicker from '../date-picker';
var Inner = /*#__PURE__*/forwardRef(function (props, ref) {
  useImperativeHandle(ref, function () {
    return {
      trigger: function trigger() {
        return __awaiter(void 0, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var _a, v;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return DatePicker.prompt({
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, props.renderValue(props.value));
});
export var FormImperativeItem = function FormImperativeItem(props) {
  var renderValue = props.renderValue,
      formItemProps = __rest(props, ["renderValue"]);

  var ref = useRef(null);
  return /*#__PURE__*/React.createElement(FormItem, Object.assign({}, formItemProps, {
    onClick: function onClick() {
      var _a;

      (_a = ref.current) === null || _a === void 0 ? void 0 : _a.trigger();
    }
  }), /*#__PURE__*/React.createElement(Inner, {
    ref: ref,
    renderValue: renderValue
  }));
};