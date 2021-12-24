import React, { ReactNode } from 'react';
import { NativeProps } from '../../utils/native-props';
export declare type PickerValue = string | null;
export declare type PickerValueExtend = {
    items: (PickerColumnItem | null)[];
};
export declare type PickerColumnItem = {
    label: ReactNode;
    value: string;
};
export declare type PickerColumn = (string | PickerColumnItem)[];
export declare type PickerViewProps = {
    columns: PickerColumn[] | ((value: PickerValue[]) => PickerColumn[]);
    value?: PickerValue[];
    defaultValue?: PickerValue[];
    onChange?: (value: PickerValue[], extend: PickerValueExtend) => void;
} & NativeProps<'--height'>;
export declare const PickerView: React.NamedExoticComponent<PickerViewProps>;