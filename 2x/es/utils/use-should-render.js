import { useInitialized } from './use-initialized';
export function useShouldRender(active, forceRender, destroyOnClose) {
  var initialized = useInitialized(active);
  if (forceRender) return true;
  if (active) return true;
  if (!initialized) return false;
  return !destroyOnClose;
}