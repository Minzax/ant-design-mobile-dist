/// <reference types="react" />
import './modal.less';
import { show } from './show';
import { alert } from './alert';
import { confirm } from './confirm';
export type { ModalProps } from './modal';
export type { Action } from './modal-action-button';
export type { ModalShowProps, ModalShowRef } from './show';
export type { ModalAlertProps } from './alert';
export type { ModalConfirmProps } from './confirm';
declare const _default: import("react").FC<import("./modal").ModalProps> & {
    show: typeof show;
    alert: typeof alert;
    confirm: typeof confirm;
};
export default _default;