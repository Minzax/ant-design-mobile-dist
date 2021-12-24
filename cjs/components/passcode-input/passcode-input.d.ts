import React, { ReactElement } from 'react';
import { NativeProps } from '../../utils/native-props';
import type { NumberKeyboardProps } from '../number-keyboard';
export declare type PasscodeInputProps = {
    value?: string;
    defaultValue?: string;
    onChange?: (val: string) => void;
    length?: number;
    plain?: boolean;
    error?: boolean;
    caret?: boolean;
    seperated?: boolean;
    onBlur?: () => void;
    onFocus?: () => void;
    keyboard?: ReactElement<NumberKeyboardProps>;
    onFill?: (val: string) => void;
} & NativeProps<'--cell-gap' | '--cell-size'>;
export declare type PasscodeInputRef = {
    focus: () => void;
    blur: () => void;
};
export declare const PasscodeInput: React.ForwardRefExoticComponent<{
    value?: string | undefined;
    defaultValue?: string | undefined;
    onChange?: ((val: string) => void) | undefined;
    length?: number | undefined;
    plain?: boolean | undefined;
    error?: boolean | undefined;
    caret?: boolean | undefined;
    seperated?: boolean | undefined;
    onBlur?: (() => void) | undefined;
    onFocus?: (() => void) | undefined;
    keyboard?: React.ReactElement<NumberKeyboardProps, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
    onFill?: ((val: string) => void) | undefined;
} & NativeProps<"--cell-size" | "--cell-gap"> & React.RefAttributes<PasscodeInputRef>>;
