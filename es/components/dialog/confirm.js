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

import { show } from './show';
import { mergeProps } from '../../utils/with-default-props';
var defaultProps = {
  confirmText: '确认',
  cancelText: '取消'
};
export function confirm(p) {
  var _this = this;

  var props = mergeProps(defaultProps, p);
  return new Promise(function (resolve) {
    show(Object.assign(Object.assign({}, props), {
      closeOnAction: true,
      onClose: function onClose() {
        var _a;

        (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
        resolve(false);
      },
      actions: [[{
        key: 'cancel',
        text: props.cancelText,
        onClick: function onClick() {
          return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var _a;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return (_a = props.onCancel) === null || _a === void 0 ? void 0 : _a.call(props);

                  case 2:
                    resolve(false);

                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));
        }
      }, {
        key: 'confirm',
        text: props.confirmText,
        bold: true,
        onClick: function onClick() {
          return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var _b;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return (_b = props.onConfirm) === null || _b === void 0 ? void 0 : _b.call(props);

                  case 2:
                    resolve(true);

                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));
        }
      }]]
    }));
  });
}