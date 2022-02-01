import { mergeProps } from '../../utils/with-default-props';
import React, { useEffect, useRef } from 'react';
import { useLockFn, useMemoizedFn } from 'ahooks';
import { withNativeProps } from '../../utils/native-props';
import { getScrollParent } from '../../utils/get-scroll-parent';
import DotLoading from '../dot-loading';

function isWindow(element) {
  return element === window;
}

const classPrefix = `adm-infinite-scroll`;

const InfiniteScrollContent = ({
  hasMore
}) => {
  return React.createElement(React.Fragment, null, hasMore ? React.createElement(React.Fragment, null, React.createElement("span", null, "\u52A0\u8F7D\u4E2D"), React.createElement(DotLoading, null)) : React.createElement("span", null, "\u6CA1\u6709\u66F4\u591A\u4E86"));
};

export const InfiniteScroll = p => {
  const props = mergeProps({
    threshold: 250
  }, p);
  const doLoadMore = useLockFn(() => props.loadMore());
  const elementRef = useRef(null);
  const checkTimeoutRef = useRef();
  const check = useMemoizedFn(() => {
    window.clearTimeout(checkTimeoutRef.current);
    checkTimeoutRef.current = window.setTimeout(() => {
      if (!props.hasMore) return;
      const element = elementRef.current;
      if (!element) return;
      if (!element.offsetParent) return;
      const parent = getScrollParent(element);
      if (!parent) return;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const current = isWindow(parent) ? window.innerHeight : parent.getBoundingClientRect().bottom;

      if (current >= elementTop - props.threshold) {
        doLoadMore();
      }
    });
  }); // 确保在内容不足时会自动触发加载事件

  useEffect(() => {
    check();
  });
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    const parent = getScrollParent(element);
    if (!parent) return;

    function onScroll() {
      check();
    }

    parent.addEventListener('scroll', onScroll);
    return () => {
      parent.removeEventListener('scroll', onScroll);
    };
  }, []);
  return withNativeProps(props, React.createElement("div", {
    className: classPrefix,
    ref: elementRef
  }, props.children && props.children, !props.children && React.createElement(InfiniteScrollContent, {
    hasMore: props.hasMore
  })));
};