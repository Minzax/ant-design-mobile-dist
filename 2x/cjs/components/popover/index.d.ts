/// <reference types="react" />
import './popover.less';
export type { BasePopoverProps, PopoverRef } from './popover';
export type { PopMenuProps, Action } from './pop-menu';
declare const _default: import("react").ForwardRefExoticComponent<{
    getContainer?: (() => HTMLElement) | undefined;
    destroyOnHide?: boolean | undefined;
    children: import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
    mode?: "dark" | "light" | undefined;
    trigger?: "click" | undefined;
    placement: "left" | "right" | "bottom" | "top" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom";
} & Pick<import("rc-tooltip/lib/Tooltip").TooltipProps, "visible" | "zIndex" | "align" | "defaultVisible" | "onVisibleChange" | "overlayStyle" | "overlayClassName"> & import("../../utils/native-props").NativeProps<"--z-index"> & {
    content: import("react").ReactNode;
} & import("react").RefAttributes<import("./popover").PopoverRef>> & {
    Menu: <T extends import("./pop-menu").Action = import("./pop-menu").Action>(props: {
        getContainer?: (() => HTMLElement) | undefined;
        destroyOnHide?: boolean | undefined;
        children: import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
        mode?: "dark" | "light" | undefined;
        trigger?: "click" | undefined;
        placement: "left" | "right" | "bottom" | "top" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom";
    } & Pick<import("rc-tooltip/lib/Tooltip").TooltipProps, "visible" | "zIndex" | "align" | "defaultVisible" | "onVisibleChange" | "overlayStyle" | "overlayClassName"> & import("../../utils/native-props").NativeProps<"--z-index"> & {
        actions: T[];
        onAction?: ((text: T) => void) | undefined;
    } & {
        ref?: ((instance: import("./popover").PopoverRef | null) => void) | import("react").RefObject<import("./popover").PopoverRef> | null | undefined;
    }) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
};
export default _default;
