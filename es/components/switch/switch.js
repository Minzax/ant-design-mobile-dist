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

import classNames from 'classnames';
import React, { useState } from 'react';
import SpinIcon from '../../assets/spin.svg';
import { withNativeProps } from '../../utils/native-props';
import { usePropsValue } from '../../utils/use-props-value';
import { mergeProps } from '../../utils/with-default-props';
var classPrefix = "adm-switch";
var defaultProps = {
  defaultChecked: false
};
export var Switch = function Switch(p) {
  var _classNames;

  var props = mergeProps(defaultProps, p);
  var disabled = props.disabled || props.loading || false;

  var _useState = useState(false),
      changing = _useState[0],
      setChanging = _useState[1];

  var _usePropsValue = usePropsValue({
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

  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    className: classNames(classPrefix, (_classNames = {}, _classNames[classPrefix + "-checked"] = checked, _classNames[classPrefix + "-disabled"] = disabled || changing, _classNames))
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-checkbox"
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-handle"
  }, (props.loading || changing) && /*#__PURE__*/React.createElement("img", {
    src: SpinIcon,
    className: classPrefix + "-icon",
    alt: 'switch-handle'
  })), /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-inner"
  }, checked ? props.checkedText : props.uncheckedText))));
};