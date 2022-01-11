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

import React, { forwardRef } from 'react';
import classNames from 'classnames';
import List from '../list';
import RcForm from 'rc-field-form';
import { FormContext } from './context';
import { mergeProps } from '../../utils/with-default-props';
import { Header } from './header';
var classPrefix = 'adm-form';
var defaultProps = {
  hasFeedback: true,
  layout: 'vertical'
};
export var Form = /*#__PURE__*/forwardRef(function (p, ref) {
  var props = mergeProps(defaultProps, p);

  var className = props.className,
      style = props.style,
      hasFeedback = props.hasFeedback,
      children = props.children,
      layout = props.layout,
      footer = props.footer,
      mode = props.mode,
      formProps = __rest(props, ["className", "style", "hasFeedback", "children", "layout", "footer", "mode"]);

  var lists = [];
  var currentHeader = null;
  var items = [];
  var count = 0;

  function collect() {
    if (items.length === 0) return;
    count += 1;
    lists.push( /*#__PURE__*/React.createElement(List, {
      header: currentHeader,
      key: count,
      mode: mode,
      style: {
        '--prefix-width': '6em',
        '--align-items': 'stretch'
      }
    }, items));
    items = [];
  }

  React.Children.forEach(props.children, function (child, index) {
    if ( /*#__PURE__*/React.isValidElement(child) && child.type === Header) {
      collect();
      currentHeader = child.props.children;
    } else {
      items.push(child);
    }
  });
  collect();
  return /*#__PURE__*/React.createElement(RcForm, Object.assign({
    className: classNames(classPrefix, classPrefix + "-" + layout, className),
    style: style,
    ref: ref
  }, formProps), /*#__PURE__*/React.createElement(FormContext.Provider, {
    value: {
      hasFeedback: hasFeedback,
      layout: layout
    }
  }, lists), footer && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-footer"
  }, footer));
});