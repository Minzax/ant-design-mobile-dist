import React, { FC, ReactNode } from 'react';
import { Action } from './modal-action-button';
import { GetContainer } from '../../utils/render-to-container';
import { PropagationEvent } from '../../utils/with-stop-propagation';
import { NativeProps } from '../../utils/native-props';
export declare type ModalProps = {
    afterClose?: () => void;
    afterShow?: () => void;
    image?: string;
    header?: ReactNode;
    title?: ReactNode;
    content?: ReactNode;
    actions?: Action[];
    onAction?: (action: Action, index: number) => void | Promise<void>;
    closeOnAction?: boolean;
    onClose?: () => void;
    closeOnMaskClick?: boolean;
    visible?: boolean;
    getContainer?: GetContainer;
    bodyStyle?: React.CSSProperties;
    bodyClassName?: string;
    maskStyle?: React.CSSProperties;
    maskClassName?: string;
    stopPropagation?: PropagationEvent[];
    showCloseButton?: boolean;
    disableBodyScroll?: boolean;
} & NativeProps;
export declare const Modal: FC<ModalProps>;
