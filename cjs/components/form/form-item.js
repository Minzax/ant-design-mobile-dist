"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormItem = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _rcFieldForm = require("rc-field-form");

var _FieldContext = _interopRequireDefault(require("rc-field-form/lib/FieldContext"));

var _devLog = require("../../utils/dev-log");

var _context = require("./context");

var _utils = require("./utils");

var _list = _interopRequireDefault(require("../list"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var NAME_SPLIT = '__SPLIT__';
var classPrefix = "adm-form-item";

var MemoInput = /*#__PURE__*/_react["default"].memo(function (_ref) {
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
  var context = (0, _react.useContext)(_context.FormContext);
  var hasFeedback = props.hasFeedback || context.hasFeedback;
  var layout = props.layout || context.layout;
  var feedback = hasFeedback && errors && errors.length > 0 ? errors[0] : null;
  var labelElement = label ? /*#__PURE__*/_react["default"].createElement("label", {
    className: classPrefix + "-label",
    htmlFor: htmlFor
  }, label, required && /*#__PURE__*/_react["default"].createElement("span", {
    className: classPrefix + "-label-required"
  }, "*"), help && /*#__PURE__*/_react["default"].createElement("span", {
    className: classPrefix + "-label-help"
  }, help)) : null;

  var descriptionElement = feedback && /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-footer"
  }, feedback);

  return /*#__PURE__*/_react["default"].createElement(_list["default"].Item, {
    style: style,
    title: layout === 'vertical' && labelElement,
    prefix: layout === 'horizontal' && labelElement,
    extra: extra,
    description: descriptionElement,
    className: (0, _classnames["default"])(classPrefix, className, (_classNames = {}, _classNames[classPrefix + "-hidden"] = hidden, _classNames[classPrefix + "-error"] = feedback !== undefined, _classNames)),
    disabled: disabled,
    onClick: props.onClick
  }, children);
};

var FormItem = function FormItem(props) {
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

  var _React$useContext = _react["default"].useContext(_FieldContext["default"]),
      contextValidateTrigger = _React$useContext.validateTrigger;

  var mergedValidateTrigger = validateTrigger !== undefined ? validateTrigger : contextValidateTrigger;

  var updateRef = _react["default"].useRef(0);

  updateRef.current += 1;

  var _useState = (0, _react.useState)({}),
      subMetas = _useState[0],
      setSubMetas = _useState[1];

  var onSubMetaChange = (0, _react.useCallback)(function (subMeta, namePath) {
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
    return /*#__PURE__*/_react["default"].createElement(FormItemLayout, {
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
    }, /*#__PURE__*/_react["default"].createElement(_context.NoStyleItemContext.Provider, {
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

  var notifyParentMetaChange = (0, _react.useContext)(_context.NoStyleItemContext);

  var onMetaChange = function onMetaChange(meta) {
    if (noStyle && notifyParentMetaChange) {
      var namePath = meta.name;
      notifyParentMetaChange(meta, namePath);
    }
  };

  return /*#__PURE__*/_react["default"].createElement(_rcFieldForm.Field, Object.assign({}, fieldProps, {
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
    var fieldId = ((0, _utils.toArray)(name).length && meta ? meta.name : []).join('_');

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
    } else if ( /*#__PURE__*/_react["default"].isValidElement(children)) {
      if (children.props.defaultValue) {
        (0, _devLog.devWarning)('Form.Item', '`defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.');
      }

      var childProps = Object.assign(Object.assign({}, children.props), control);

      if (!childProps.id) {
        childProps.id = fieldId;
      } // We should keep user origin event handler


      var triggers = new Set([].concat((0, _utils.toArray)(trigger), (0, _utils.toArray)(mergedValidateTrigger)));
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
      childNode = /*#__PURE__*/_react["default"].createElement(MemoInput, {
        value: control[props.valuePropName || 'value'],
        update: updateRef.current
      }, /*#__PURE__*/_react["default"].cloneElement(children, childProps));
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