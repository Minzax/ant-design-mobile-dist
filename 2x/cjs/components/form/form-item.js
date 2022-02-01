"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormItem = void 0;

var _tslib = require("tslib");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _rcFieldForm = require("rc-field-form");

var _FieldContext = _interopRequireDefault(require("rc-field-form/lib/FieldContext"));

var _devLog = require("../../utils/dev-log");

var _context = require("./context");

var _utils = require("./utils");

var _list = _interopRequireDefault(require("../list"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const NAME_SPLIT = '__SPLIT__';
const classPrefix = `adm-form-item`;

const MemoInput = _react.default.memo(({
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
  const context = (0, _react.useContext)(_context.FormContext);
  const hasFeedback = props.hasFeedback !== undefined ? props.hasFeedback : context.hasFeedback;
  const layout = props.layout || context.layout;
  const feedback = hasFeedback && errors && errors.length > 0 ? errors[0] : null;
  const labelElement = label ? _react.default.createElement("label", {
    className: `${classPrefix}-label`,
    htmlFor: htmlFor
  }, label, required && _react.default.createElement("span", {
    className: `${classPrefix}-label-required`
  }, "*"), help && _react.default.createElement("span", {
    className: `${classPrefix}-label-help`
  }, help)) : null;

  const descriptionElement = feedback && _react.default.createElement("div", {
    className: `${classPrefix}-footer`
  }, feedback);

  return _react.default.createElement(_list.default.Item, {
    style: style,
    title: layout === 'vertical' && labelElement,
    prefix: layout === 'horizontal' && labelElement,
    extra: extra,
    description: descriptionElement,
    className: (0, _classnames.default)(classPrefix, className, {
      [`${classPrefix}-hidden`]: hidden,
      [`${classPrefix}-error`]: feedback !== null
    }),
    disabled: disabled,
    onClick: props.onClick,
    arrow: arrow
  }, children);
};

const FormItem = props => {
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
        fieldProps = (0, _tslib.__rest)(props, ["className", "style", "label", "help", "extra", "hasFeedback", "name", "required", "noStyle", "hidden", "layout", "disabled", "rules", "children", "messageVariables", "trigger", "validateTrigger", "onClick", "shouldUpdate", "dependencies", "arrow"]);

  const {
    validateTrigger: contextValidateTrigger
  } = _react.default.useContext(_FieldContext.default);

  const mergedValidateTrigger = validateTrigger !== undefined ? validateTrigger : contextValidateTrigger;

  const updateRef = _react.default.useRef(0);

  updateRef.current += 1;
  const [subMetas, setSubMetas] = (0, _react.useState)({});
  const onSubMetaChange = (0, _react.useCallback)((subMeta, namePath) => {
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
    return _react.default.createElement(FormItemLayout, {
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
    }, _react.default.createElement(_context.NoStyleItemContext.Provider, {
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

  const notifyParentMetaChange = (0, _react.useContext)(_context.NoStyleItemContext);

  const onMetaChange = meta => {
    if (noStyle && notifyParentMetaChange) {
      const namePath = meta.name;
      notifyParentMetaChange(meta, namePath);
    }
  };

  return _react.default.createElement(_rcFieldForm.Field, Object.assign({}, fieldProps, {
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
    const fieldId = ((0, _utils.toArray)(name).length && meta ? meta.name : []).join('_');

    if (shouldUpdate && dependencies) {
      (0, _devLog.devWarning)('Form.Item', "`shouldUpdate` and `dependencies` shouldn't be used together.");
    }

    if (isRenderProps) {
      if ((shouldUpdate || dependencies) && !name) {
        childNode = children(context);
      } else {
        if (!(shouldUpdate || dependencies)) {
          (0, _devLog.devWarning)('Form.Item', '`children` of render props only work with `shouldUpdate` or `dependencies`.');
        }

        if (name) {
          (0, _devLog.devWarning)('Form.Item', "Do not use `name` with `children` of render props since it's not a field.");
        }
      } // not render props

    } else if (dependencies && !name) {
      (0, _devLog.devWarning)('Form.Item', 'Must set `name` or use render props when `dependencies` is set.');
    } else if (_react.default.isValidElement(children)) {
      if (children.props.defaultValue) {
        (0, _devLog.devWarning)('Form.Item', '`defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.');
      }

      const childProps = Object.assign(Object.assign({}, children.props), control);

      if (!childProps.id) {
        childProps.id = fieldId;
      } // We should keep user origin event handler


      const triggers = new Set([...(0, _utils.toArray)(trigger), ...(0, _utils.toArray)(mergedValidateTrigger)]);
      triggers.forEach(eventName => {
        childProps[eventName] = (...args) => {
          var _a, _b, _c;

          (_a = control[eventName]) === null || _a === void 0 ? void 0 : _a.call(control, ...args);
          (_c = (_b = children.props)[eventName]) === null || _c === void 0 ? void 0 : _c.call(_b, ...args);
        };
      });
      childNode = _react.default.createElement(MemoInput, {
        value: control[props.valuePropName || 'value'],
        update: updateRef.current
      }, _react.default.cloneElement(children, childProps));
    } else {
      if (name) {
        (0, _devLog.devWarning)('Form.Item', '`name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead.');
      }

      childNode = children;
    }

    return renderLayout(childNode, fieldId, meta, isRequired);
  });
};

exports.FormItem = FormItem;