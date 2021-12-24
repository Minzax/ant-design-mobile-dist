import React, { ReactElement } from 'react';
import type { InputProps } from '../input';
import { NativeProps } from '../../utils/native-props';
import { NumberKeyboardProps } from '../number-keyboard';
export declare type VirtualInputProps = {
    onFocus?: () => void;
    onBlur?: () => void;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    keyboard?: ReactElement<NumberKeyboardProps>;
    clearable?: boolean;
    onClear?: () => void;
} & Pick<InputProps, 'value' | 'onChange' | 'placeholder' | 'disabled'> & NativeProps<'--font-size' | '--color' | '--placeholder-color' | '--disabled-color' | '--text-align' | '--caret-width' | '--caret-color'>;
export declare type VirtualInputRef = {
    focus: () => void;
    blur: () => void;
};
export declare const VirtualInput: React.ForwardRefExoticComponent<{
    onFocus?: (() => void) | undefined;
    onBlur?: (() => void) | undefined;
    onClick?: ((e: React.MouseEvent<HTMLDivElement>) => void) | undefined;
    keyboard?: React.ReactElement<NumberKeyboardProps, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
    clearable?: boolean | undefined;
    onClear?: (() => void) | undefined;
} & Pick<InputProps, "value" | "disabled" | "onChange" | "placeholder"> & NativeProps<"--font-size" | "--color" | "--placeholder-color" | "--disabled-color" | "--text-align" | "--caret-width" | "--caret-color"> & React.RefAttributes<VirtualInputRef>>;
