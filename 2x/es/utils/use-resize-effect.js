import { useLayoutEffect } from 'react';
import { useMemoizedFn } from 'ahooks';
export function useResizeEffect(effect, targetRef) {
  var fn = useMemoizedFn(effect);
  useLayoutEffect(function () {
    var target = targetRef.current;
    if (!target) return;

    if (window.ResizeObserver) {
      var observer = new ResizeObserver(function () {
        fn(target);
      });
      observer.observe(target);
      return function () {
        observer.disconnect();
      };
    } else {
      fn(target);
    }
  }, [targetRef]);
}