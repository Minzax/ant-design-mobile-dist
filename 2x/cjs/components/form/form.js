"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _list = _interopRequireDefault(require("../list"));

var _rcFieldForm = _interopRequireDefault(require("rc-field-form"));

var _context = require("./context");

var _withDefaultProps = require("../../utils/with-default-props");

var _header = require("./header");

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

var classPrefix = 'adm-form';
var defaultProps = {
  hasFeedback: true,
  layout: 'vertical'
};
var Form = /*#__PURE__*/(0, _react.forwardRef)(function (p, ref) {
  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);

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
    lists.push( /*#__PURE__*/_react["default"].createElement(_list["default"], {
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

  _react["default"].Children.forEach(props.children, function (child, index) {
    if ( /*#__PURE__*/ /*#__PURE__*/_react["default"].isValidElement(child) && child.type === _header.Header) {
      collect();
      currentHeader = child.props.children;
    } else {
      items.push(child);
    }
  });

  collect();
  return /*#__PURE__*/_react["default"].createElement(_rcFieldForm["default"], Object.assign({
    className: (0, _classnames["default"])(classPrefix, classPrefix + "-" + layout, className),
    style: style,
    ref: ref
  }, formProps), /*#__PURE__*/_react["default"].createElement(_context.FormContext.Provider, {
    value: {
      hasFeedback: hasFeedback,
      layout: layout
    }
  }, lists), footer && /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-footer"
  }, footer));
});
exports.Form = Form;