import React, { useEffect, useRef } from 'react';
import { useInViewport } from 'ahooks';
export var LazyDetector = function LazyDetector(props) {
  var ref = useRef(null);

  var _useInViewport = useInViewport(ref),
      inViewport = _useInViewport[0];

  useEffect(function () {
    if (inViewport) {
      props.onActive();
    }
  }, [inViewport]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref
  });
};