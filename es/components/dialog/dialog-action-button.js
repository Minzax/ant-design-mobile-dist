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

import React, { useState } from 'react';
import classNames from 'classnames';
import Button from '../button';
import { withNativeProps } from '../../utils/native-props';
export var DialogActionButton = function DialogActionButton(props) {
  var action = props.action;

  var _useState = useState(false),
      loading = _useState[0],
      setLoading = _useState[1];

  function handleClick() {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var promise;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setLoading(true);
              _context.prev = 1;
              promise = props.onAction();
              _context.next = 5;
              return promise;

            case 5:
              setLoading(false);
              _context.next = 12;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);
              setLoading(false);
              throw _context.t0;

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 8]]);
    }));
  }

  return withNativeProps(props.action, /*#__PURE__*/React.createElement(Button, {
    key: action.key,
    onClick: handleClick,
    className: classNames('adm-dialog-button', {
      'adm-dialog-button-bold': action.bold
    }),
    fill: 'none',
    block: true,
    color: action.danger ? 'danger' : 'primary',
    loading: loading,
    disabled: action.disabled
  }, action.text));
};