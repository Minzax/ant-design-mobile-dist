import React, { ReactElement, Ref } from 'react';
import { PopoverProps, PopoverRef } from './popover';
export declare type Action = {
    text: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
    key?: string;
    onClick?: () => void;
    [key: string]: any;
};
export declare type PopoverMenuProps<T> = Omit<PopoverProps, 'content'> & {
    actions: T[];
    onAction?: (text: T) => void;
};
export declare const PopoverMenu: <T extends Action = Action>(props: Pick<PopoverProps, "children" | "style" | "visible" | "className" | "tabIndex" | "mode" | "align" | "getContainer" | "stopPropagation" | "trigger" | "defaultVisible" | "onVisibleChange" | "placement" | "destroyOnHide"> & {
    actions: T[];
    onAction?: ((text: T) => void) | undefined;
} & {
    ref?: ((instance: PopoverRef | null) => void) | React.RefObject<PopoverRef> | null | undefined;
}) => ReactElement;
