import { useRef } from 'react';
import { useMemoizedFn, useUpdate } from 'ahooks';
export function usePropsValue(options) {
  var value = options.value,
      defaultValue = options.defaultValue,
      onChange = options.onChange;
  var update = useUpdate();
  var stateRef = useRef(value !== undefined ? value : defaultValue);

  if (value !== undefined) {
    stateRef.current = value;
  }

  var setState = useMemoizedFn(function (v) {
    if (value === undefined) {
      stateRef.current = v;
      update();
    }

    onChange === null || onChange === void 0 ? void 0 : onChange(v);
  });
  return [stateRef.current, setState];
}