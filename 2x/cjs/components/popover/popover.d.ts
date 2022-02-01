import React, { ReactElement } from 'react';
import type { TooltipProps } from 'rc-tooltip/lib/Tooltip';
import { NativeProps } from '../../utils/native-props';
import { PropagationEvent } from '../../utils/with-stop-propagation';
import { GetContainer } from '../../utils/render-to-container';
export declare type PopoverProps = {
    getContainer?: GetContainer;
    destroyOnHide?: boolean;
    children: ReactElement;
    mode?: 'light' | 'dark';
    trigger?: 'click';
    placement?: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
    stopPropagation?: PropagationEvent[];
    content: React.ReactNode;
} & Pick<TooltipProps, 'defaultVisible' | 'visible' | 'onVisibleChange' | 'align'> & NativeProps<'--z-index'>;
export declare type PopoverRef = {
    show: () => void;
    hide: () => void;
    visible: boolean;
};
export declare const Popover: React.ForwardRefExoticComponent<{
    getContainer?: HTMLElement | (() => HTMLElement) | null | undefined;
    destroyOnHide?: boolean | undefined;
    children: ReactElement;
    mode?: "dark" | "light" | undefined;
    trigger?: "click" | undefined;
    placement?: "left" | "right" | "bottom" | "top" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom" | undefined;
    stopPropagation?: "click"[] | undefined;
    content: React.ReactNode;
} & Pick<TooltipProps, "visible" | "align" | "defaultVisible" | "onVisibleChange"> & NativeProps<"--z-index"> & React.RefAttributes<PopoverRef>>;
