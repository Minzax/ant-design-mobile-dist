/// <reference types="react" />
import './swiper.less';
export type { SwiperProps, SwiperRef } from './swiper';
declare const _default: import("react").ForwardRefExoticComponent<import("react").RefAttributes<unknown>> & {
    Item: import("react").FC<{
        onClick?: ((e: import("react").MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
        children?: import("react").ReactNode;
    } & import("../../utils/native-props").NativeProps<never>>;
};
export default _default;
