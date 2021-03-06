"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = void 0;

var _tslib = require("tslib");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _list = _interopRequireDefault(require("../list"));

var _rcFieldForm = _interopRequireDefault(require("rc-field-form"));

var _context = require("./context");

var _withDefaultProps = require("../../utils/with-default-props");

var _header = require("./header");

var _configProvider = require("../config-provider");

var _merge = _interopRequireDefault(require("lodash/merge"));

var _formArray = require("./form-array");

var _traverseReactNode = require("../../utils/traverse-react-node");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const classPrefix = 'adm-form';
const defaultProps = _context.defaultFormContext;
const Form = (0, _react.forwardRef)((p, ref) => {
  const props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  const {
    className,
    style,
    hasFeedback,
    children,
    layout,
    footer,
    mode,
    requiredMarkStyle
  } = props,
        formProps = (0, _tslib.__rest)(props, ["className", "style", "hasFeedback", "children", "layout", "footer", "mode", "requiredMarkStyle"]);
  const {
    locale
  } = (0, _configProvider.useConfig)();
  const validateMessages = (0, _react.useMemo)(() => (0, _merge.default)({}, locale.Form.defaultValidateMessages, formProps.validateMessages), [locale.Form.defaultValidateMessages, formProps.validateMessages]);
  const lists = [];
  let currentHeader = null;
  let items = [];
  let count = 0;

  function collect() {
    if (items.length === 0) return;
    count += 1;
    lists.push(_react.default.createElement(_list.default, {
      header: currentHeader,
      key: count,
      mode: mode
    }, items));
    items = [];
  }

  (0, _traverseReactNode.traverseReactNode)(props.children, child => {
    if (_react.default.isValidElement(child)) {
      if (child.type === _header.Header) {
        collect();
        currentHeader = child.props.children;
        return;
      }

      if (child.type === _formArray.FormArray) {
        collect();
        lists.push(child);
        return;
      }
    }

    items.push(child);
  });
  collect();
  return _react.default.createElement(_rcFieldForm.default, Object.assign({
    className: (0, _classnames.default)(classPrefix, className),
    style: style,
    ref: ref
  }, formProps, {
    validateMessages: validateMessages
  }), _react.default.createElement(_context.FormContext.Provider, {
    value: {
      name: formProps.name,
      hasFeedback,
      layout,
      requiredMarkStyle
    }
  }, lists), footer && _react.default.createElement("div", {
    className: `${classPrefix}-footer`
  }, footer));
});
exports.Form = Form;