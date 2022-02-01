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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const classPrefix = 'adm-form';
const defaultProps = {
  hasFeedback: true,
  layout: 'vertical'
};
const Form = (0, _react.forwardRef)((p, ref) => {
  const props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  const {
    className,
    style,
    hasFeedback,
    children,
    layout,
    footer,
    mode
  } = props,
        formProps = (0, _tslib.__rest)(props, ["className", "style", "hasFeedback", "children", "layout", "footer", "mode"]);
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

  _react.default.Children.forEach(props.children, (child, index) => {
    if (_react.default.isValidElement(child) && child.type === _header.Header) {
      collect();
      currentHeader = child.props.children;
    } else {
      items.push(child);
    }
  });

  collect();
  return _react.default.createElement(_rcFieldForm.default, Object.assign({
    className: (0, _classnames.default)(classPrefix, `${classPrefix}-${layout}`, className),
    style: style,
    ref: ref
  }, formProps), _react.default.createElement(_context.FormContext.Provider, {
    value: {
      hasFeedback: hasFeedback,
      layout
    }
  }, lists), footer && _react.default.createElement("div", {
    className: `${classPrefix}-footer`
  }, footer));
});
exports.Form = Form;