import React from 'react';
import { PopupProps } from '../popup';
import { GetContainer } from '../../utils/render-to-container';
import { NativeProps } from '../../utils/native-props';
export declare type NumberKeyboardProps = {
    visible?: boolean;
    title?: string;
    getContainer?: GetContainer;
    confirmText?: string | null;
    customKey?: '-' | '.' | 'X';
    randomOrder?: boolean;
    showCloseButton?: boolean;
    onInput?: (v: string) => void;
    onDelete?: () => void;
    onClose?: () => void;
    onConfirm?: () => void;
    afterShow?: () => void;
    afterClose?: () => void;
    closeOnConfirm?: boolean;
    safeArea?: boolean;
} & Pick<PopupProps, 'stopPropagation'> & NativeProps;
export declare const NumberKeyboard: React.FC<NumberKeyboardProps>;