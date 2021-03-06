/// <reference types="react" />
import './swiper.less';
export type { SwiperProps, SwiperRef } from './swiper';
declare const _default: import("react").ForwardRefExoticComponent<{
    defaultIndex?: number | undefined;
    allowTouchMove?: boolean | undefined;
    autoplay?: boolean | undefined;
    autoplayInterval?: number | undefined;
    loop?: boolean | undefined;
    direction?: "vertical" | "horizontal" | undefined;
    onIndexChange?: ((index: number) => void) | undefined;
    indicatorProps?: Pick<import("../page-indicator").PageIndicatorProps, "style" | "className" | "color"> | undefined;
    indicator?: ((total: number, current: number) => import("react").ReactNode) | undefined;
    slideSize?: number | undefined;
    trackOffset?: number | undefined;
    stuckAtBoundary?: boolean | undefined;
    rubberband?: boolean | undefined;
    children?: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>[] | undefined;
} & import("../../utils/native-props").NativeProps<"--border-radius" | "--width" | "--height" | "--track-padding"> & import("react").RefAttributes<import("./swiper").SwiperRef>> & {
    Item: import("react").FC<{
        onClick?: ((e: import("react").MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
        children?: import("react").ReactNode;
    } & import("../../utils/native-props").NativeProps<never>>;
};
export default _default;
