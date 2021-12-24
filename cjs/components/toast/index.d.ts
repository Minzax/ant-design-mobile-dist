import './toast.less';
import { clear, show, config } from './methods';
export type { ToastShowProps } from './methods';
declare const Toast: {
    show: typeof show;
    clear: typeof clear;
    config: typeof config;
};
export default Toast;
