import { mergeProps } from '../../utils/with-default-props';
import React, { useEffect, useRef } from 'react';
import { useLockFn, usePersistFn } from 'ahooks';
import { withNativeProps } from '../../utils/native-props';
import { getScrollParent } from '../../utils/get-scroll-parent';
import Loading from '../loading';

function isWindow(element) {
  return element === window;
}

var classPrefix = "adm-infinite-scroll";

var InfiniteScrollContent = function InfiniteScrollContent(_ref) {
  var hasMore = _ref.hasMore;
  return /*#__PURE__*/React.createElement(React.Fragment, null, hasMore ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "\u52A0\u8F7D\u4E2D"), /*#__PURE__*/React.createElement(Loading, null)) : /*#__PURE__*/React.createElement("span", null, "\u6CA1\u6709\u66F4\u591A\u4E86"));
};

export var InfiniteScroll = function InfiniteScroll(p) {
  var props = mergeProps({
    threshold: 250
  }, p);
  var doLoadMore = useLockFn(function () {
    return props.loadMore();
  });
  var elementRef = useRef(null);
  var checkTimeoutRef = useRef();
  var check = usePersistFn(function () {
    window.clearTimeout(checkTimeoutRef.current);
    checkTimeoutRef.current = window.setTimeout(function () {
      if (!props.hasMore) return;
      var element = elementRef.current;
      if (!element) return;
      if (!element.offsetParent) return;
      var parent = getScrollParent(element);
      if (!parent) return;
      var rect = element.getBoundingClientRect();
      var elementTop = rect.top;
      var current = isWindow(parent) ? window.innerHeight : parent.getBoundingClientRect().bottom;

      if (current >= elementTop - props.threshold) {
        doLoadMore();
      }
    });
  }); // 确保在内容不足时会自动触发加载事件

  useEffect(function () {
    check();
  });
  useEffect(function () {
    var element = elementRef.current;
    if (!element) return;
    var parent = getScrollParent(element);
    if (!parent) return;

    function onScroll() {
      check();
    }

    parent.addEventListener('scroll', onScroll);
    return function () {
      parent.removeEventListener('scroll', onScroll);
    };
  }, []);
  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classPrefix,
    ref: elementRef
  }, props.children && props.children, !props.children && /*#__PURE__*/React.createElement(InfiniteScrollContent, {
    hasMore: props.hasMore
  })));
};