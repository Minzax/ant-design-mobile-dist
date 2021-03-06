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
    closeOnMaskClick?: boolean;
    visible?: boolean;
    title?: ReactNode;
    confirmText?: ReactNode;
    cancelText?: ReactNode;
    children?: (items: (PickerColumnItem | null)[]) => ReactNode;
    renderLabel?: (item: PickerColumnItem) => ReactNode;
    mouseWheel?: boolean;
} & Pick<PopupProps, 'getContainer' | 'afterShow' | 'afterClose' | 'onClick' | 'stopPropagation'> & NativeProps<'--header-button-font-size' | '--title-font-size' | '--item-font-size' | '--item-height'>;
export declare const Picker: React.NamedExoticComponent<PickerProps>;
