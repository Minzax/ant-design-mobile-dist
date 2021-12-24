"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ellipsis = void 0;

var _react = _interopRequireWildcard(require("react"));

var _withDefaultProps = require("../../utils/with-default-props");

var _nativeProps = require("../../utils/native-props");

var _useResizeEffect = require("../../utils/use-resize-effect");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var classPrefix = "adm-ellipsis";
var defaultProps = {
  direction: 'end',
  rows: 1,
  expandText: '',
  collapseText: ''
};

var Ellipsis = function Ellipsis(p) {
  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  var rootRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)({}),
      ellipsised = _useState[0],
      setEllipsised = _useState[1];

  var _useState2 = (0, _react.useState)(false),
      expanded = _useState2[0],
      setExpanded = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      exceeded = _useState3[0],
      setExceeded = _useState3[1];

  (0, _useResizeEffect.useResizeEffect)(function () {
    var root = rootRef.current;
    if (!root) return;
    var originStyle = window.getComputedStyle(root);
    var container = document.createElement('div');
    var styleNames = Array.prototype.slice.apply(originStyle);
    styleNames.forEach(function (name) {
      container.style.setProperty(name, originStyle.getPropertyValue(name));
    });
    container.style.position = 'fixed';
    container.style.left = '999999px';
    container.style.top = '999999px';
    container.style.zIndex = '-1000';
    container.style.height = 'auto';
    container.style.minHeight = 'auto';
    container.style.maxHeight = 'auto';
    container.style.textOverflow = 'clip';
    container.style.whiteSpace = 'normal';
    container.style.webkitLineClamp = 'unset';
    container.style.webkitBoxOrient = 'unset';
    container.style.display = 'block';
    var lineHeight = pxToNumber(originStyle.lineHeight);
    var maxHeight = Math.floor(lineHeight * (props.rows + 0.5) + pxToNumber(originStyle.paddingTop) + pxToNumber(originStyle.paddingBottom));
    container.innerText = props.content;
    document.body.appendChild(container);

    if (container.offsetHeight <= maxHeight) {
      setExceeded(false);
    } else {
      var check = function check(left, right) {
        if (right - left <= 1) {
          if (props.direction === 'end') {
            return {
              leading: props.content.slice(0, left) + '...'
            };
          } else {
            return {
              tailing: '...' + props.content.slice(right, end)
            };
          }
        }

        var middle = Math.round((left + right) / 2);

        if (props.direction === 'end') {
          container.innerText = props.content.slice(0, middle) + '...' + actionText;
        } else {
          container.innerText = actionText + '...' + props.content.slice(middle, end);
        }

        if (container.offsetHeight <= maxHeight) {
          if (props.direction === 'end') {
            return check(middle, right);
          } else {
            return check(left, middle);
          }
        } else {
          if (props.direction === 'end') {
            return check(left, middle);
          } else {
            return check(middle, right);
          }
        }
      };

      var checkMiddle = function checkMiddle(leftPart, rightPart) {
        if (leftPart[1] - leftPart[0] <= 1 && rightPart[1] - rightPart[0] <= 1) {
          return {
            leading: props.content.slice(0, leftPart[0]) + '...',
            tailing: '...' + props.content.slice(rightPart[1], end)
          };
        }

        var leftPartMiddle = Math.floor((leftPart[0] + leftPart[1]) / 2);
        var rightPartMiddle = Math.floor((rightPart[0] + rightPart[1]) / 2);
        container.innerText = props.content.slice(0, leftPartMiddle) + '...' + actionText + '...' + props.content.slice(rightPartMiddle, end);

        if (container.offsetHeight <= maxHeight) {
          return checkMiddle([leftPartMiddle, leftPart[1]], [rightPart[0], rightPartMiddle]);
        } else {
          return checkMiddle([leftPart[0], leftPartMiddle], [rightPartMiddle, rightPart[1]]);
        }
      };

      setExceeded(true);
      var end = props.content.length;
      var actionText = expanded ? props.collapseText : props.expandText;
      var middle = Math.floor((0 + end) / 2);

      var _ellipsised = props.direction === 'middle' ? checkMiddle([0, middle], [middle, end]) : check(0, end);

      setEllipsised(_ellipsised);
    }

    document.body.removeChild(container);
  }, rootRef);
  var expandActionElement = exceeded && props.expandText ? /*#__PURE__*/_react["default"].createElement("a", {
    onClick: function onClick() {
      setExpanded(true);
    }
  }, props.expandText) : null;
  var collapseActionElement = exceeded && props.expandText ? /*#__PURE__*/_react["default"].createElement("a", {
    onClick: function onClick() {
      setExpanded(false);
    }
  }, props.collapseText) : null;

  var renderContent = function renderContent() {
    if (!exceeded) {
      return props.content;
    }

    if (expanded) {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, props.content, collapseActionElement);
    } else {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, ellipsised.leading, expandActionElement, ellipsised.tailing);
    }
  };

  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    ref: rootRef,
    className: classPrefix
  }, renderContent()));
};

exports.Ellipsis = Ellipsis;

function pxToNumber(value) {
  if (!value) return 0;
  var match = value.match(/^\d*(\.\d*)?/);
  return match ? Number(match[0]) : 0;
}