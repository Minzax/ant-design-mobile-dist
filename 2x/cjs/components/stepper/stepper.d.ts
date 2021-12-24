import { FC } from 'react';
import { NativeProps } from '../../utils/native-props';
import { InputProps } from '../input';
export declare type StepperProps = Pick<InputProps, 'onFocus' | 'onBlur'> & {
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    digits?: number;
    disabled?: boolean;
    onChange?: (value: number) => void;
} & NativeProps<'--height' | '--input-width' | '--input-font-size' | '--border-radius' | '--border' | '--border-inner' | '--active-border' | '--button-font-size' | '--button-background-color' | '--button-width' | '--input-font-color' | '--button-text-color'>;
export declare const Stepper: FC<StepperProps>;
