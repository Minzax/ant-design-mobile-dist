import { useLayoutEffect } from 'react';
import { useMemoizedFn } from 'ahooks';
export function useResizeEffect(effect, targetRef) {
  const fn = useMemoizedFn(effect);
  useLayoutEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    if (window.ResizeObserver) {
      const observer = new ResizeObserver(() => {
        fn(target);
      });
      observer.observe(target);
      return () => {
        observer.disconnect();
      };
    } else {
      fn(target);
    }
  }, [targetRef]);
}