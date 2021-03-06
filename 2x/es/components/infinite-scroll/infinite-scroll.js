import { __awaiter } from "tslib";
import { mergeProps } from '../../utils/with-default-props';
import React, { useEffect, useRef, useState } from 'react';
import { useLockFn, useMemoizedFn } from 'ahooks';
import { withNativeProps } from '../../utils/native-props';
import { getScrollParent } from '../../utils/get-scroll-parent';
import { useConfig } from '../config-provider';
import DotLoading from '../dot-loading';

function isWindow(element) {
  return element === window;
}

const classPrefix = `adm-infinite-scroll`;

const InfiniteScrollContent = ({
  hasMore
}) => {
  const {
    locale
  } = useConfig();
  return React.createElement(React.Fragment, null, hasMore ? React.createElement(React.Fragment, null, React.createElement("span", null, locale.common.loading), React.createElement(DotLoading, null)) : React.createElement("span", null, locale.InfiniteScroll.noMore));
};

export const InfiniteScroll = p => {
  const props = mergeProps({
    threshold: 250
  }, p);
  const doLoadMore = useLockFn(() => props.loadMore());
  const elementRef = useRef(null);
  const [flag, setFlag] = useState({});
  const nextFlagRef = useRef(flag);
  const check = useMemoizedFn(() => __awaiter(void 0, void 0, void 0, function* () {
    if (nextFlagRef.current !== flag) return;
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
      const nextFlag = {};
      nextFlagRef.current = nextFlag;
      yield doLoadMore();
      setFlag(nextFlag);
    }
  })); // 确保在内容不足时会自动触发加载事件

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