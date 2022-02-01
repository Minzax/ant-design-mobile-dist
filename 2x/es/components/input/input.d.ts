import React from 'react';
import { NativeProps } from '../../utils/native-props';
declare type NativeInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export declare type InputProps = Pick<NativeInputProps, 'maxLength' | 'minLength' | 'max' | 'min' | 'autoComplete' | 'pattern' | 'inputMode' | 'type' | 'onFocus' | 'onBlur' | 'autoCapitalize' | 'autoCorrect' | 'onKeyDown' | 'onKeyUp' | 'onClick' | 'onCompositionStart' | 'onCompositionEnd'> & {
    value?: string;
    defaultValue?: string;
    onChange?: (val: string) => void;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    clearable?: boolean;
    onClear?: () => void;
    id?: string;
    onEnterPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
} & NativeProps<'--font-size' | '--color' | '--placeholder-color' | '--text-align'>;
export declare type InputRef = {
    clear: () => void;
    focus: () => void;
    blur: () => void;
};
export declare const Input: React.ForwardRefExoticComponent<Pick<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "pattern" | "onClick" | "max" | "min" | "type" | "onCompositionEnd" | "onCompositionStart" | "onFocus" | "onBlur" | "onKeyDown" | "onKeyUp" | "autoCapitalize" | "autoCorrect" | "inputMode" | "autoComplete" | "maxLength" | "minLength"> & {
    value?: string | undefined;
    defaultValue?: string | undefined;
    onChange?: ((val: string) => void) | undefined;
    placeholder?: string | undefined;
    disabled?: boolean | undefined;
    readOnly?: boolean | undefined;
    clearable?: boolean | undefined;
    onClear?: (() => void) | undefined;
    id?: string | undefined;
    onEnterPress?: ((e: React.KeyboardEvent<HTMLInputElement>) => void) | undefined;
    enterKeyHint?: "enter" | "search" | "done" | "go" | "next" | "previous" | "send" | undefined;
} & NativeProps<"--color" | "--font-size" | "--placeholder-color" | "--text-align"> & React.RefAttributes<InputRef>>;
export {};
