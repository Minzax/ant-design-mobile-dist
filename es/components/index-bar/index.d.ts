/// <reference types="react" />
import './index-bar.less';
export type { IndexBarProps, IndexBarRef } from './index-bar';
declare const _default: import("react").ForwardRefExoticComponent<{
    sticky?: boolean | undefined;
    children?: import("react").ReactNode;
} & import("../../utils/native-props").NativeProps<"--sticky-offset-top"> & import("react").RefAttributes<import("./index-bar").IndexBarRef>> & {
    Panel: import("react").FC<import("./panel").IndexBarAnchorProps>;
};
export default _default;
