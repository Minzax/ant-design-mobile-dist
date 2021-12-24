import { FC, ReactNode } from 'react';
import { PickerProps } from '../picker';
import { NativeProps } from '../../utils/native-props';
import type { Precision, DatePickerFilter } from './date-picker-utils';
export declare type DatePickerProps = Pick<PickerProps, 'onCancel' | 'onClose' | 'visible' | 'confirmText' | 'cancelText' | 'getContainer' | 'afterShow' | 'afterClose' | 'onClick' | 'title' | 'stopPropagation'> & {
    value?: Date;
    defaultValue?: Date;
    onSelect?: (value: Date) => void;
    onConfirm?: (value: Date) => void;
    min?: Date;
    max?: Date;
    precision?: Precision;
    children?: (value: Date | null) => ReactNode;
    renderLabel?: (type: Precision, data: number) => ReactNode;
    filter?: DatePickerFilter;
} & NativeProps;
export declare const DatePicker: FC<DatePickerProps>;
