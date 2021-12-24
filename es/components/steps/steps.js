import React from 'react';
import classNames from 'classnames';
import { mergeProps } from '../../utils/with-default-props';
import { withNativeProps } from '../../utils/native-props';
var classPrefix = "adm-steps";
var stepClassPrefix = "adm-step";
var defaultIcon = /*#__PURE__*/React.createElement("span", {
  className: stepClassPrefix + "-icon-dot"
});
var defaultProps = {
  current: 0,
  direction: 'horizontal'
};
export var Steps = function Steps(p) {
  var props = mergeProps(defaultProps, p);
  var direction = props.direction,
      current = props.current;
  var classString = classNames(classPrefix, classPrefix + "-" + direction);
  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classString
  }, React.Children.map(props.children, function (child, index) {
    var _a;

    if (! /*#__PURE__*/React.isValidElement(child)) {
      return child;
    }

    var props = child.props;
    var status = props.status || 'wait';

    if (index < current) {
      status = props.status || 'finish';
    } else if (index === current) {
      status = props.status || 'process';
    }

    var icon = (_a = props.icon) !== null && _a !== void 0 ? _a : defaultIcon;
    return /*#__PURE__*/React.cloneElement(child, {
      status: status,
      icon: icon
    });
  })));
};