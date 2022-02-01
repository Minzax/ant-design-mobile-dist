import { __rest } from "tslib";
import React, { useContext, useCallback, useState } from 'react';
import classNames from 'classnames';
import { Field } from 'rc-field-form';
import FieldContext from 'rc-field-form/lib/FieldContext';
import { devWarning } from '../../utils/dev-log';
import { FormContext, NoStyleItemContext } from './context';
import { toArray } from './utils';
import List from '../list';
const NAME_SPLIT = '__SPLIT__';
const classPrefix = `adm-form-item`;
const MemoInput = React.memo(({
  children
}) => children, (prev, next) => prev.value === next.value && prev.update === next.update);

const FormItemLayout = props => {
  const {
    className,
    style,
    extra,
    label,
    help,
    required,
    disabled,
    children,
    htmlFor,
    hidden,
    errors,
    arrow
  } = props;
  const context = useContext(FormContext);
  const hasFeedback = props.hasFeedback !== undefined ? props.hasFeedback : context.hasFeedback;
  const layout = props.layout || context.layout;
  const feedback = hasFeedback && errors && errors.length > 0 ? errors[0] : null;
  const labelElement = label ? React.createElement("label", {
    className: `${classPrefix}-label`,
    htmlFor: htmlFor
  }, label, required && React.createElement("span", {
    className: `${classPrefix}-label-required`
  }, "*"), help && React.createElement("span", {
    className: `${classPrefix}-label-help`
  }, help)) : null;
  const descriptionElement = feedback && React.createElement("div", {
    className: `${classPrefix}-footer`
  }, feedback);
  return React.createElement(List.Item, {
    style: style,
    title: layout === 'vertical' && labelElement,
    prefix: layout === 'horizontal' && labelElement,
    extra: extra,
    description: descriptionElement,
    className: classNames(classPrefix, className, {
      [`${classPrefix}-hidden`]: hidden,
      [`${classPrefix}-error`]: feedback !== null
    }),
    disabled: disabled,
    onClick: props.onClick,
    arrow: arrow
  }, children);
};

export const FormItem = props => {
  const {
    // 样式相关
    className,
    style,
    // FormItem 相关
    label,
    help,
    extra,
    hasFeedback,
    name,
    required,
    noStyle,
    hidden,
    layout,
    // Field 相关
    disabled,
    rules,
    children,
    messageVariables,
    trigger = 'onChange',
    validateTrigger,
    onClick,
    shouldUpdate,
    dependencies,
    arrow
  } = props,
        fieldProps = __rest(props, ["className", "style", "label", "help", "extra", "hasFeedback", "name", "required", "noStyle", "hidden", "layout", "disabled", "rules", "children", "messageVariables", "trigger", "validateTrigger", "onClick", "shouldUpdate", "dependencies", "arrow"]);

  const {
    validateTrigger: contextValidateTrigger
  } = React.useContext(FieldContext);
  const mergedValidateTrigger = validateTrigger !== undefined ? validateTrigger : contextValidateTrigger;
  const updateRef = React.useRef(0);
  updateRef.current += 1;
  const [subMetas, setSubMetas] = useState({});
  const onSubMetaChange = useCallback((subMeta, namePath) => {
    setSubMetas(prevSubMetas => {
      const nextSubMetas = Object.assign({}, prevSubMetas);
      const nameKey = namePath.join(NAME_SPLIT);

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

    const curErrors = (_a = meta === null || meta === void 0 ? void 0 : meta.errors) !== null && _a !== void 0 ? _a : [];
    const errors = Object.keys(subMetas).reduce((subErrors, key) => {
      var _a, _b;

      const errors = (_b = (_a = subMetas[key]) === null || _a === void 0 ? void 0 : _a.errors) !== null && _b !== void 0 ? _b : [];

      if (errors.length) {
        subErrors = [...subErrors, ...errors];
      }

      return subErrors;
    }, curErrors);
    return React.createElement(FormItemLayout, {
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
      layout: layout,
      arrow: arrow
    }, React.createElement(NoStyleItemContext.Provider, {
      value: onSubMetaChange
    }, baseChildren));
  }

  const isRenderProps = typeof children === 'function';

  if (!name && !isRenderProps && !props.dependencies) {
    return renderLayout(children);
  }

  let Variables = {};

  if (typeof label === 'string') {
    Variables.label = label;
  }

  if (messageVariables) {
    Variables = Object.assign(Object.assign({}, Variables), messageVariables);
  }

  const notifyParentMetaChange = useContext(NoStyleItemContext);

  const onMetaChange = meta => {
    if (noStyle && notifyParentMetaChange) {
      const namePath = meta.name;
      notifyParentMetaChange(meta, namePath);
    }
  };

  return React.createElement(Field, Object.assign({}, fieldProps, {
    name: name,
    shouldUpdate: shouldUpdate,
    dependencies: dependencies,
    rules: rules,
    trigger: trigger,
    validateTrigger: mergedValidateTrigger,
    onMetaChange: onMetaChange,
    messageVariables: Variables
  }), (control, meta, context) => {
    let childNode = null;
    const isRequired = required !== undefined ? required : !!(rules && rules.some(rule => {
      if (rule && typeof rule === 'object' && rule.required) {
        return true;
      }

      return false;
    }));
    const fieldId = (toArray(name).length && meta ? meta.name : []).join('_');

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
    } else if (React.isValidElement(children)) {
      if (children.props.defaultValue) {
        devWarning('Form.Item', '`defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.');
      }

      const childProps = Object.assign(Object.assign({}, children.props), control);

      if (!childProps.id) {
        childProps.id = fieldId;
      } // We should keep user origin event handler


      const triggers = new Set([...toArray(trigger), ...toArray(mergedValidateTrigger)]);
      triggers.forEach(eventName => {
        childProps[eventName] = (...args) => {
          var _a, _b, _c;

          (_a = control[eventName]) === null || _a === void 0 ? void 0 : _a.call(control, ...args);
          (_c = (_b = children.props)[eventName]) === null || _c === void 0 ? void 0 : _c.call(_b, ...args);
        };
      });
      childNode = React.createElement(MemoInput, {
        value: control[props.valuePropName || 'value'],
        update: updateRef.current
      }, React.cloneElement(children, childProps));
    } else {
      if (name) {
        devWarning('Form.Item', '`name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead.');
      }

      childNode = children;
    }

    return renderLayout(childNode, fieldId, meta, isRequired);
  });
};