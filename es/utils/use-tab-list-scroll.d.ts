import { RefObject } from 'react';
export declare const useTabListScroll: (targetRef: RefObject<HTMLElement>, activeIndex: number) => {
    scrollLeft: import("@react-spring/web").SpringValue<number>;
    animate: (immediate?: boolean) => void;
};
