import { FC } from 'react';
import { NativeProps } from '../../utils/native-props';
import type { PickerViewProps } from '../picker-view';
import type { CascadePickerOption } from '../cascade-picker';
export declare type CascadePickerViewProps = Omit<PickerViewProps, 'columns'> & {
    options: CascadePickerOption[];
} & NativeProps<'--height'>;
export declare const CascadePickerView: FC<CascadePickerViewProps>;
