import React from 'react';
import classNames from 'classnames';
export function withNativeProps(props, element) {
  var p = Object.assign({}, element.props);

  if (props.className) {
    p.className = classNames(element.props.className, props.className);
  }

  if (props.style) {
    p.style = Object.assign(Object.assign({}, p.style), props.style);
  }

  if (props.tabIndex !== undefined) {
    p.tabIndex = props.tabIndex;
  }

  for (var key in props) {
    if (!props.hasOwnProperty(key)) continue;

    if (key.startsWith('data-') || key.startsWith('aria-')) {
      p[key] = props[key];
    }
  }

  return /*#__PURE__*/React.cloneElement(element, p);
}