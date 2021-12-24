import React from 'react';
import { PickerColumnItem, PickerValue } from './index';
interface Props {
    index: number;
    column: PickerColumnItem[];
    value: PickerValue;
    onSelect: (value: PickerValue, index: number) => void;
}
export declare const Column: React.NamedExoticComponent<Props>;
export {};
