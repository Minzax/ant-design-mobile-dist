import { useLayoutEffect } from 'react';
import { useSpring } from '@react-spring/web';
import { useMutationEffect } from './use-mutation-effect';
import { bound } from './bound';
import { useUpdateLayoutEffect } from 'ahooks';
export var useTabListScroll = function useTabListScroll(targetRef, activeIndex) {
  var _useSpring = useSpring(function () {
    return {
      scrollLeft: 0,
      config: {
        tension: 300,
        clamp: true
      }
    };
  }),
      scrollLeft = _useSpring[0].scrollLeft,
      api = _useSpring[1];

  function animate(immediate) {
    if (immediate === void 0) {
      immediate = false;
    }

    var container = targetRef.current;
    if (!container) return;
    if (!activeIndex) return;
    var activeTabWrapper = container.children.item(activeIndex);
    var activeTab = activeTabWrapper.children.item(0);
    var activeTabLeft = activeTab.offsetLeft;
    var activeTabWidth = activeTab.offsetWidth;
    var containerWidth = container.offsetWidth;
    var containerScrollWidth = container.scrollWidth;
    var containerScrollLeft = container.scrollLeft;
    var maxScrollDistance = containerScrollWidth - containerWidth;
    if (maxScrollDistance <= 0) return;
    var nextScrollLeft = bound(activeTabLeft - (containerWidth - activeTabWidth) / 2, 0, containerScrollWidth - containerWidth);
    api.start({
      scrollLeft: nextScrollLeft,
      from: {
        scrollLeft: containerScrollLeft
      },
      immediate: immediate
    });
  }

  useLayoutEffect(function () {
    animate(true);
  }, []);
  useUpdateLayoutEffect(function () {
    animate();
  }, [activeIndex]);
  useMutationEffect(function () {
    animate(true);
  }, targetRef, {
    subtree: true,
    childList: true,
    characterData: true
  });
  return {
    scrollLeft: scrollLeft,
    animate: animate
  };
};