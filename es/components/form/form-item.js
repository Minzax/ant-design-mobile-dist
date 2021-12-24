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

import React, { useContext, useCallback, useState } from 'react';
import classNames from 'classnames';
import { Field } from 'rc-field-form';
import FieldContext from 'rc-field-form/lib/FieldContext';
import { devWarning } from '../../utils/dev-log';
import { FormContext, NoStyleItemContext } from './context';
import { toArray } from './utils';
import List from '../list';
var NAME_SPLIT = '__SPLIT__';
var classPrefix = "adm-form-item";
var MemoInput = /*#__PURE__*/React.memo(function (_ref) {
  var children = _ref.children;
  return children;
}, function (prev, next) {
  return prev.value === next.value && prev.update === next.update;
});

var FormItemLayout = function FormItemLayout(props) {
  var _classNames;

  var className = props.className,
      style = props.style,
      extra = props.extra,
      label = props.label,
      help = props.help,
      required = props.required,
      disabled = props.disabled,
      children = props.children,
      htmlFor = props.htmlFor,
      hidden = props.hidden,
      errors = props.errors;
  var context = useContext(FormContext);
  var hasFeedback = props.hasFeedback || context.hasFeedback;
  var layout = props.layout || context.layout;
  var feedback = hasFeedback && errors && errors.length > 0 ? errors[0] : null;
  var labelElement = label ? /*#__PURE__*/React.createElement("label", {
    className: classPrefix + "-label",
    htmlFor: htmlFor
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: classPrefix + "-label-required"
  }, "*"), help && /*#__PURE__*/React.createElement("span", {
    className: classPrefix + "-label-help"
  }, help)) : null;
  var descriptionElement = feedback && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-footer"
  }, feedback);
  return /*#__PURE__*/React.createElement(List.Item, {
    style: style,
    title: layout === 'vertical' && labelElement,
    prefix: layout === 'horizontal' && labelElement,
    extra: extra,
    description: descriptionElement,
    className: classNames(classPrefix, className, (_classNames = {}, _classNames[classPrefix + "-hidden"] = hidden, _classNames[classPrefix + "-error"] = feedback !== null, _classNames)),
    disabled: disabled,
    onClick: props.onClick
  }, children);
};

export var FormItem = function FormItem(props) {
  var className = props.className,
      style = props.style,
      label = props.label,
      help = props.help,
      extra = props.extra,
      hasFeedback = props.hasFeedback,
      name = props.name,
      required = props.required,
      noStyle = props.noStyle,
      hidden = props.hidden,
      layout = props.layout,
      disabled = props.disabled,
      rules = props.rules,
      children = props.children,
      messageVariables = props.messageVariables,
      _props$trigger = props.trigger,
      trigger = _props$trigger === void 0 ? 'onChange' : _props$trigger,
      validateTrigger = props.validateTrigger,
      onClick = props.onClick,
      shouldUpdate = props.shouldUpdate,
      dependencies = props.dependencies,
      fieldProps = __rest(props, ["className", "style", "label", "help", "extra", "hasFeedback", "name", "required", "noStyle", "hidden", "layout", "disabled", "rules", "children", "messageVariables", "trigger", "validateTrigger", "onClick", "shouldUpdate", "dependencies"]);

  var _React$useContext = React.useContext(FieldContext),
      contextValidateTrigger = _React$useContext.validateTrigger;

  var mergedValidateTrigger = validateTrigger !== undefined ? validateTrigger : contextValidateTrigger;
  var updateRef = React.useRef(0);
  updateRef.current += 1;

  var _useState = useState({}),
      subMetas = _useState[0],
      setSubMetas = _useState[1];

  var onSubMetaChange = useCallback(function (subMeta, namePath) {
    setSubMetas(function (prevSubMetas) {
      var nextSubMetas = Object.assign({}, prevSubMetas);
      var nameKey = namePath.join(NAME_SPLIT);

      if (subMeta.destroy) {
        delete nextSubMetas[nameKey];
      } else {
        nextSubMetas[nameKey] = subMeta;
      }

      return nextSubMetas;
    });
  }, [setSubMetas]);

  function renderLayout(baseChildren, fieldId, meta, isRequired) {
    var _a;

    if (noStyle && !hidden) {
      return baseChildren;
    }

    var curErrors = (_a = meta === null || meta === void 0 ? void 0 : meta.errors) !== null && _a !== void 0 ? _a : [];
    var errors = Object.keys(subMetas).reduce(function (subErrors, key) {
      var _a, _b;

      var errors = (_b = (_a = subMetas[key]) === null || _a === void 0 ? void 0 : _a.errors) !== null && _b !== void 0 ? _b : [];

      if (errors.length) {
        subErrors = [].concat(subErrors, errors);
      }

      return subErrors;
    }, curErrors);
    return /*#__PURE__*/React.createElement(FormItemLayout, {
      className: className,
      style: style,
      label: label,
      extra: extra,
      help: help,
      required: isRequired,
      disabled: disabled,
      hasFeedback: hasFeedback,
      htmlFor: fieldId,
      errors: errors,
      onClick: onClick,
      hidden: hidden,
      layout: layout
    }, /*#__PURE__*/React.createElement(NoStyleItemContext.Provider, {
      value: onSubMetaChange
    }, baseChildren));
  }

  var isRenderProps = typeof children === 'function';

  if (!name && !isRenderProps && !props.dependencies) {
    return renderLayout(children);
  }

  var Variables = {};

  if (typeof label === 'string') {
    Variables.label = label;
  }

  if (messageVariables) {
    Variables = Object.assign(Object.assign({}, Variables), messageVariables);
  }

  var notifyParentMetaChange = useContext(NoStyleItemContext);

  var onMetaChange = function onMetaChange(meta) {
    if (noStyle && notifyParentMetaChange) {
      var namePath = meta.name;
      notifyParentMetaChange(meta, namePath);
    }
  };

  return /*#__PURE__*/React.createElement(Field, Object.assign({}, fieldProps, {
    name: name,
    shouldUpdate: shouldUpdate,
    dependencies: dependencies,
    rules: rules,
    trigger: trigger,
    validateTrigger: mergedValidateTrigger,
    onMetaChange: onMetaChange
  }), function (control, meta, context) {
    var childNode = null;
    var isRequired = required !== undefined ? required : !!(rules && rules.some(function (rule) {
      if (rule && typeof rule === 'object' && rule.required) {
        return true;
      }

      return false;
    }));
    var fieldId = (toArray(name).length && meta ? meta.name : []).join('_');

    if (shouldUpdate && dependencies) {
      devWarning('Form.Item', "`shouldUpdate` and `dependencies` shouldn't be used together.");
    }

    if (isRenderProps) {
      if ((shouldUpdate || dependencies) && !name) {
        childNode = children(context);
      } else {
        if (!(shouldUpdate || dependencies)) {
          devWarning('Form.Item', '`children` of render props only work with `shouldUpdate` or `dependencies`.');
        }

        if (name) {
          devWarning('Form.Item', "Do not use `name` with `children` of render props since it's not a field.");
        }
      } // not render props

    } else if (dependencies && !name) {
      devWarning('Form.Item', 'Must set `name` or use render props when `dependencies` is set.');
    } else if ( /*#__PURE__*/React.isValidElement(children)) {
      if (children.props.defaultValue) {
        devWarning('Form.Item', '`defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.');
      }

      var childProps = Object.assign(Object.assign({}, children.props), control);

      if (!childProps.id) {
        childProps.id = fieldId;
      } // We should keep user origin event handler


      var triggers = new Set([].concat(toArray(trigger), toArray(mergedValidateTrigger)));
      triggers.forEach(function (eventName) {
        childProps[eventName] = function () {
          var _a2, _c2;

          var _a, _b, _c;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          (_a = control[eventName]) === null || _a === void 0 ? void 0 : (_a2 = _a).call.apply(_a2, [control].concat(args));
          (_c = (_b = children.props)[eventName]) === null || _c === void 0 ? void 0 : (_c2 = _c).call.apply(_c2, [_b].concat(args));
        };
      });
      childNode = /*#__PURE__*/React.createElement(MemoInput, {
        value: control[props.valuePropName || 'value'],
        update: updateRef.current
      }, /*#__PURE__*/React.cloneElement(children, childProps));
    } else {
      if (name) {
        devWarning('Form.Item', '`name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead.');
      }

      childNode = children;
    }

    return renderLayout(childNode, fieldId, meta, isRequired);
  });
};