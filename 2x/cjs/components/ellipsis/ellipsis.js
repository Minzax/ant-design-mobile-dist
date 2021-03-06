"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ellipsis = void 0;

var _react = _interopRequireWildcard(require("react"));

var _withDefaultProps = require("../../utils/with-default-props");

var _nativeProps = require("../../utils/native-props");

var _useResizeEffect = require("../../utils/use-resize-effect");

var _ahooks = require("ahooks");

var _withStopPropagation = require("../../utils/with-stop-propagation");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const classPrefix = `adm-ellipsis`;
const defaultProps = {
  direction: 'end',
  rows: 1,
  expandText: '',
  collapseText: '',
  stopPropagationForActionButtons: [],
  onContentClick: () => {}
};

const Ellipsis = p => {
  const props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  const rootRef = (0, _react.useRef)(null);
  const [ellipsised, setEllipsised] = (0, _react.useState)({});
  const [expanded, setExpanded] = (0, _react.useState)(false);
  const [exceeded, setExceeded] = (0, _react.useState)(false);

  function calcEllipsised() {
    const root = rootRef.current;
    if (!root) return;
    const originStyle = window.getComputedStyle(root);
    const container = document.createElement('div');
    const styleNames = Array.prototype.slice.apply(originStyle);
    styleNames.forEach(name => {
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
    const lineHeight = pxToNumber(originStyle.lineHeight);
    const maxHeight = Math.floor(lineHeight * (props.rows + 0.5) + pxToNumber(originStyle.paddingTop) + pxToNumber(originStyle.paddingBottom));
    container.innerText = props.content;
    document.body.appendChild(container);

    if (container.offsetHeight <= maxHeight) {
      setExceeded(false);
    } else {
      setExceeded(true);
      const end = props.content.length;
      const actionText = expanded ? props.collapseText : props.expandText;

      function check(left, right) {
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

        const middle = Math.round((left + right) / 2);

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
      }

      function checkMiddle(leftPart, rightPart) {
        if (leftPart[1] - leftPart[0] <= 1 && rightPart[1] - rightPart[0] <= 1) {
          return {
            leading: props.content.slice(0, leftPart[0]) + '...',
            tailing: '...' + props.content.slice(rightPart[1], end)
          };
        }

        const leftPartMiddle = Math.floor((leftPart[0] + leftPart[1]) / 2);
        const rightPartMiddle = Math.floor((rightPart[0] + rightPart[1]) / 2);
        container.innerText = props.content.slice(0, leftPartMiddle) + '...' + actionText + '...' + props.content.slice(rightPartMiddle, end);

        if (container.offsetHeight <= maxHeight) {
          return checkMiddle([leftPartMiddle, leftPart[1]], [rightPart[0], rightPartMiddle]);
        } else {
          return checkMiddle([leftPart[0], leftPartMiddle], [rightPartMiddle, rightPart[1]]);
        }
      }

      const middle = Math.floor((0 + end) / 2);
      const ellipsised = props.direction === 'middle' ? checkMiddle([0, middle], [middle, end]) : check(0, end);
      setEllipsised(ellipsised);
    }

    document.body.removeChild(container);
  }

  (0, _useResizeEffect.useResizeEffect)(calcEllipsised, rootRef);
  (0, _ahooks.useIsomorphicLayoutEffect)(() => {
    calcEllipsised();
  }, [props.content, props.direction, props.rows, props.expandText, props.collapseText]);
  const expandActionElement = exceeded && props.expandText ? (0, _withStopPropagation.withStopPropagation)(props.stopPropagationForActionButtons, _react.default.createElement("a", {
    onClick: () => {
      setExpanded(true);
    }
  }, props.expandText)) : null;
  const collapseActionElement = exceeded && props.expandText ? (0, _withStopPropagation.withStopPropagation)(props.stopPropagationForActionButtons, _react.default.createElement("a", {
    onClick: () => {
      setExpanded(false);
    }
  }, props.collapseText)) : null;

  const renderContent = () => {
    if (!exceeded) {
      return props.content;
    }

    if (expanded) {
      return _react.default.createElement(_react.default.Fragment, null, props.content, collapseActionElement);
    } else {
      return _react.default.createElement(_react.default.Fragment, null, ellipsised.leading, expandActionElement, ellipsised.tailing);
    }
  };

  return (0, _nativeProps.withNativeProps)(props, _react.default.createElement("div", {
    ref: rootRef,
    className: classPrefix,
    onClick: e => {
      if (e.target === e.currentTarget) {
        props.onContentClick(e);
      }
    }
  }, renderContent()));
};

exports.Ellipsis = Ellipsis;

function pxToNumber(value) {
  if (!value) return 0;
  const match = value.match(/^\d*(\.\d*)?/);
  return match ? Number(match[0]) : 0;
}