import React, { useContext } from 'react';
import List from '../list';
import { withNativeProps } from '../../utils/native-props';
import { CheckListContext } from './context';
import { devWarning } from '../../utils/dev-log';
import classNames from 'classnames';
var classPrefix = "adm-check-list-item";
export var CheckListItem = function CheckListItem(props) {
  var _classNames;

  var context = useContext(CheckListContext);

  if (context === null) {
    devWarning('CheckList.Item', 'CheckList.Item can only be used inside CheckList.');
    return null;
  }

  var active = context.value.includes(props.value);
  var readOnly = props.readOnly || context.readOnly;
  var extra = /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-extra"
  }, active ? context.activeIcon : null);
  return withNativeProps(props, /*#__PURE__*/React.createElement(List.Item, {
    title: props.title,
    className: classNames((_classNames = {}, _classNames[classPrefix + "-readonly"] = readOnly, _classNames)),
    description: props.description,
    prefix: props.prefix,
    onClick: function onClick(e) {
      var _a;

      if (readOnly) return;

      if (active) {
        context.uncheck(props.value);
      } else {
        context.check(props.value);
      }

      (_a = props.onClick) === null || _a === void 0 ? void 0 : _a.call(props, e);
    },
    arrow: false,
    clickable: !readOnly,
    extra: extra,
    disabled: props.disabled || context.disabled
  }, props.children));
};