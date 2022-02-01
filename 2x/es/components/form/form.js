import { __rest } from "tslib";
import React, { forwardRef } from 'react';
import classNames from 'classnames';
import List from '../list';
import RcForm from 'rc-field-form';
import { FormContext } from './context';
import { mergeProps } from '../../utils/with-default-props';
import { Header } from './header';
const classPrefix = 'adm-form';
const defaultProps = {
  hasFeedback: true,
  layout: 'vertical'
};
export const Form = forwardRef((p, ref) => {
  const props = mergeProps(defaultProps, p);

  const {
    className,
    style,
    hasFeedback,
    children,
    layout,
    footer,
    mode
  } = props,
        formProps = __rest(props, ["className", "style", "hasFeedback", "children", "layout", "footer", "mode"]);

  const lists = [];
  let currentHeader = null;
  let items = [];
  let count = 0;

  function collect() {
    if (items.length === 0) return;
    count += 1;
    lists.push(React.createElement(List, {
      header: currentHeader,
      key: count,
      mode: mode
    }, items));
    items = [];
  }

  React.Children.forEach(props.children, (child, index) => {
    if (React.isValidElement(child) && child.type === Header) {
      collect();
      currentHeader = child.props.children;
    } else {
      items.push(child);
    }
  });
  collect();
  return React.createElement(RcForm, Object.assign({
    className: classNames(classPrefix, `${classPrefix}-${layout}`, className),
    style: style,
    ref: ref
  }, formProps), React.createElement(FormContext.Provider, {
    value: {
      hasFeedback: hasFeedback,
      layout
    }
  }, lists), footer && React.createElement("div", {
    className: `${classPrefix}-footer`
  }, footer));
});