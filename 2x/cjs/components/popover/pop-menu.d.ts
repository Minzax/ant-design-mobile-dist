import React, { ReactElement, Ref } from 'react';
import { BasePopoverProps, PopoverRef } from './popover';
export declare type Action = {
    text: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
    key?: string;
    onClick?: () => void;
    [key: string]: any;
};
export declare type PopMenuProps<T> = BasePopoverProps & {
    actions: T[];
    onAction?: (text: T) => void;
};
export declare const PopMenu: <T extends Action = Action>(props: {
    getContainer?: (() => HTMLElement) | undefined;
    destroyOnHide?: boolean | undefined;
    children: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
    mode?: "dark" | "light" | undefined;
    trigger?: "click" | undefined;
    placement: "left" | "right" | "bottom" | "top" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom";
} & Pick<import("rc-tooltip/lib/Tooltip").TooltipProps, "visible" | "zIndex" | "align" | "defaultVisible" | "onVisibleChange" | "overlayStyle" | "overlayClassName"> & import("../../utils/native-props").NativeProps<"--z-index"> & {
    actions: T[];
    onAction?: ((text: T) => void) | undefined;
} & {
    ref?: ((instance: PopoverRef | null) => void) | React.RefObject<PopoverRef> | null | undefined;
}) => ReactElement;
