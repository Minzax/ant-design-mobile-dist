import { mergeProps } from '../../utils/with-default-props';
import React, { useState, useRef } from 'react';
import { withNativeProps } from '../../utils/native-props';
import { PictureOutline, PictureWrongOutline } from 'antd-mobile-icons';
import { staged } from 'staged-components';
import { toCSSLength } from '../../utils/to-css-length';
import { LazyDetector } from './lazy-detector';
import { useUpdateLayoutEffect } from 'ahooks';
var classPrefix = "adm-image";
var defaultProps = {
  fit: 'fill',
  placeholder: /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-tip"
  }, /*#__PURE__*/React.createElement(PictureOutline, null)),
  fallback: /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-tip"
  }, /*#__PURE__*/React.createElement(PictureWrongOutline, null)),
  lazy: false
};
export var Image = staged(function (p) {
  var props = mergeProps(defaultProps, p);

  var _useState = useState(false),
      loaded = _useState[0],
      setLoaded = _useState[1];

  var _useState2 = useState(false),
      failed = _useState2[0],
      setFailed = _useState2[1];

  var ref = useRef(null);
  var src = props.src;
  var srcSet = props.srcSet;

  var _useState3 = useState(!props.lazy),
      initialized = _useState3[0],
      setInitialized = _useState3[1];

  src = initialized ? props.src : undefined;
  srcSet = initialized ? props.srcSet : undefined;
  useUpdateLayoutEffect(function () {
    setLoaded(false);
    setFailed(false);
  }, [src]);

  function renderInner() {
    if (failed) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, props.fallback);
    }

    var img = /*#__PURE__*/React.createElement("img", {
      className: classPrefix + "-img",
      src: src,
      alt: props.alt,
      onClick: props.onClick,
      onLoad: function onLoad() {
        setLoaded(true);
      },
      onError: function onError(e) {
        var _a;

        setFailed(true);
        (_a = props.onError) === null || _a === void 0 ? void 0 : _a.call(props, e);
      },
      style: {
        objectFit: props.fit,
        display: loaded ? 'block' : 'none'
      },
      crossOrigin: props.crossOrigin,
      decoding: props.decoding,
      loading: props.loading,
      referrerPolicy: props.referrerPolicy,
      sizes: props.sizes,
      srcSet: srcSet,
      useMap: props.useMap
    });
    return /*#__PURE__*/React.createElement(React.Fragment, null, !loaded && props.placeholder, img);
  }

  var style = {};

  if (props.width) {
    style['--width'] = toCSSLength(props.width);
  }

  if (props.height) {
    style['--height'] = toCSSLength(props.height);
  }

  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: classPrefix,
    style: style
  }, props.lazy && !initialized && /*#__PURE__*/React.createElement(LazyDetector, {
    onActive: function onActive() {
      setInitialized(true);
    }
  }), renderInner()));
});