import React from 'react';
import { mergeProps } from '../../utils/with-default-props';
import { renderToContainer } from '../../utils/render-to-container';
import Mask from '../mask';
import { Slide } from './slide';
import { Slides } from './slides';
var classPrefix = "adm-image-viewer";
var defaultProps = {
  maxZoom: 3,
  getContainer: null,
  visible: false
};
export var ImageViewer = function ImageViewer(p) {
  var props = mergeProps(defaultProps, p);
  var node = /*#__PURE__*/React.createElement(Mask, {
    visible: props.visible,
    disableBodyScroll: false,
    opacity: 'thick',
    afterClose: props.afterClose
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-content"
  }, props.image && /*#__PURE__*/React.createElement(Slide, {
    image: props.image,
    onTap: function onTap() {
      var _a;

      (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
    },
    maxZoom: props.maxZoom
  })));
  return renderToContainer(props.getContainer, node);
};
var multiDefaultProps = Object.assign(Object.assign({}, defaultProps), {
  defaultIndex: 0
});
export var MultiImageViewer = function MultiImageViewer(p) {
  var props = mergeProps(multiDefaultProps, p);
  var node = /*#__PURE__*/React.createElement(Mask, {
    visible: props.visible,
    disableBodyScroll: false,
    opacity: 'thick',
    afterClose: props.afterClose
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-content"
  }, props.images && /*#__PURE__*/React.createElement(Slides, {
    defaultIndex: props.defaultIndex,
    onIndexChange: props.onIndexChange,
    images: props.images,
    onTap: function onTap() {
      var _a;

      (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
    },
    maxZoom: props.maxZoom
  })));
  return renderToContainer(props.getContainer, node);
};