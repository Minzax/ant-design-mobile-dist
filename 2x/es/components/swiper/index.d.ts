/// <reference types="react" />
import './swiper.less';
export type { SwiperProps, SwiperRef } from './swiper';
declare const _default: import("react").ForwardRefExoticComponent<{
    defaultIndex?: number | undefined;
    allowTouchMove?: boolean | undefined;
    autoplay?: boolean | undefined;
    autoplayInterval?: number | undefined;
    loop?: boolean | undefined;
    direction?: "horizontal" | "vertical" | undefined;
    onIndexChange?: ((index: number) => void) | undefined;
    indicatorProps?: Pick<import("../page-indicator").PageIndicatorProps, "style" | "color" | "className"> | undefined;
    indicator?: ((total: number, current: number) => import("react").ReactNode) | undefined;
    slideSize?: number | undefined;
    trackOffset?: number | undefined;
    stuckAtBoundary?: boolean | undefined;
    rubberband?: boolean | undefined;
    children?: import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)> | import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>[] | undefined;
} & import("../../utils/native-props").NativeProps<"--border-radius" | "--height" | "--width" | "--track-padding"> & import("react").RefAttributes<import("./swiper").SwiperRef>> & {
    Item: import("react").FC<{
        onClick?: ((e: import("react").MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
    } & import("../../utils/native-props").NativeProps<never>>;
};
export default _default;
