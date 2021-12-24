import React, { ReactNode } from 'react';
import { PopupProps } from '../popup';
import { NativeProps } from '../../utils/native-props';
import { PickerColumn, PickerColumnItem, PickerValue, PickerValueExtend } from './index';
export declare type PickerProps = {
    columns: PickerColumn[] | ((value: PickerValue[]) => PickerColumn[]);
    value?: PickerValue[];
    defaultValue?: PickerValue[];
    onSelect?: (value: PickerValue[], extend: PickerValueExtend) => void;
    onConfirm?: (value: PickerValue[], extend: PickerValueExtend) => void;
    onCancel?: () => void;
    onClose?: () => void;
    visible?: boolean;
    title?: ReactNode;
    confirmText?: string;
    cancelText?: string;
    children?: (items: (PickerColumnItem | null)[]) => ReactNode;
} & Pick<PopupProps, 'getContainer' | 'afterShow' | 'afterClose' | 'onClick' | 'stopPropagation'> & NativeProps;
export declare const Picker: React.NamedExoticComponent<PickerProps>;