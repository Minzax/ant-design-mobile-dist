import React, { ReactElement, ReactNode } from 'react';
import { NativeProps } from '../../utils/native-props';
import { PageIndicatorProps } from '../page-indicator';
export declare type SwiperRef = {
    swipeTo: (index: number) => void;
    swipeNext: () => void;
    swipePrev: () => void;
};
export declare type SwiperProps = {
    defaultIndex?: number;
    allowTouchMove?: boolean;
    autoplay?: boolean;
    autoplayInterval?: number;
    loop?: boolean;
    direction?: 'horizontal' | 'vertical';
    onIndexChange?: (index: number) => void;
    indicatorProps?: Pick<PageIndicatorProps, 'color' | 'style' | 'className'>;
    indicator?: (total: number, current: number) => ReactNode;
    slideSize?: number;
    trackOffset?: number;
    stuckAtBoundary?: boolean;
    rubberband?: boolean;
    children?: ReactElement | ReactElement[];
} & NativeProps<'--height' | '--width' | '--border-radius' | '--track-padding'>;
export declare const Swiper: React.ForwardRefExoticComponent<React.RefAttributes<unknown>>;
