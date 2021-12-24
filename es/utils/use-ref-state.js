import { useLayoutEffect, useRef, useState } from 'react';
export function useRefState(initialState) {
  var _useState = useState(initialState),
      state = _useState[0],
      setState = _useState[1];

  var ref = useRef(state);
  useLayoutEffect(function () {
    ref.current = state;
  }, [state]);
  return [state, setState, ref];
}