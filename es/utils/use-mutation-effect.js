import { useEffect } from 'react';
import { useMemoizedFn } from 'ahooks';
export function useMutationEffect(effect, targetRef, options) {
  var fn = useMemoizedFn(effect);
  useEffect(function () {
    var observer = new MutationObserver(function () {
      fn();
    });
    if (!targetRef.current) return;
    observer.observe(targetRef.current, options);
    return function () {
      observer.disconnect();
    };
  }, [targetRef]);
}