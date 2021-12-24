import { useEffect } from 'react';
import { usePersistFn } from 'ahooks';
export function useMutationEffect(effect, targetRef, options) {
  var fn = usePersistFn(effect);
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