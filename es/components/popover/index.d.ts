/// <reference types="react" />
import './popover.less';
import './popover-menu.less';
export type { PopoverProps, PopoverRef } from './popover';
export type { PopoverMenuProps, Action } from './popover-menu';
declare const _default: import("react").ForwardRefExoticComponent<{
    getContainer?: HTMLElement | (() => HTMLElement) | null | undefined;
    destroyOnHide?: boolean | undefined;
    children: import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
    mode?: "dark" | "light" | undefined;
    trigger?: "click" | undefined;
    placement?: "left" | "right" | "bottom" | "top" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom" | undefined;
    stopPropagation?: "click"[] | undefined;
    content: import("react").ReactNode;
} & Pick<import("rc-tooltip/lib/Tooltip").TooltipProps, "visible" | "align" | "defaultVisible" | "onVisibleChange"> & import("../../utils/native-props").NativeProps<"--z-index"> & import("react").RefAttributes<import("./popover").PopoverRef>> & {
    Menu: <T extends import("./popover-menu").Action = import("./popover-menu").Action>(props: Pick<import("./popover").PopoverProps, "children" | "style" | "visible" | "className" | "tabIndex" | "mode" | "align" | "getContainer" | "stopPropagation" | "trigger" | "defaultVisible" | "onVisibleChange" | "placement" | "destroyOnHide"> & {
        actions: T[];
        onAction?: ((text: T) => void) | undefined;
    } & {
        ref?: ((instance: import("./popover").PopoverRef | null) => void) | import("react").RefObject<import("./popover").PopoverRef> | null | undefined;
    }) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
};
export default _default;
