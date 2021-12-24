import React, { ReactElement } from 'react';
import type { TooltipProps } from 'rc-tooltip/lib/Tooltip';
import { NativeProps } from '../../utils/native-props';
export declare type BasePopoverProps = {
    getContainer?: () => HTMLElement;
    destroyOnHide?: boolean;
    children: ReactElement;
    mode?: 'light' | 'dark';
    trigger?: 'click';
    placement: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
} & Pick<TooltipProps, 'defaultVisible' | 'visible' | 'onVisibleChange' | 'overlayStyle' | 'overlayClassName' | 'align' | 'zIndex'> & NativeProps<'--z-index'>;
export declare type PopoverRef = {
    show: () => void;
    hide: () => void;
    visible: boolean;
};
export declare const Popover: React.ForwardRefExoticComponent<{
    getContainer?: (() => HTMLElement) | undefined;
    destroyOnHide?: boolean | undefined;
    children: ReactElement;
    mode?: "dark" | "light" | undefined;
    trigger?: "click" | undefined;
    placement: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
} & Pick<TooltipProps, "visible" | "zIndex" | "align" | "defaultVisible" | "onVisibleChange" | "overlayStyle" | "overlayClassName"> & NativeProps<"--z-index"> & {
    content: React.ReactNode;
} & React.RefAttributes<PopoverRef>>;
