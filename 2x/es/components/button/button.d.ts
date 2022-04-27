import React from 'react';
import { NativeProps } from '../../utils/native-props';
export declare type ButtonProps = {
    color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
    fill?: 'solid' | 'outline' | 'none';
    size?: 'mini' | 'small' | 'middle' | 'large';
    block?: boolean;
    loading?: boolean;
    loadingText?: string;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    type?: 'submit' | 'reset' | 'button';
    shape?: 'default' | 'rounded' | 'rectangular';
    children?: React.ReactNode;
} & NativeProps<'--text-color' | '--background-color' | '--border-radius' | '--border-width' | '--border-style' | '--border-color'>;
export declare type ButtonRef = {
    nativeElement: HTMLButtonElement | null;
};
export declare const Button: React.ForwardRefExoticComponent<{
    color?: "default" | "primary" | "success" | "warning" | "danger" | undefined;
    fill?: "none" | "solid" | "outline" | undefined;
    size?: "small" | "large" | "middle" | "mini" | undefined;
    block?: boolean | undefined;
    loading?: boolean | undefined;
    loadingText?: string | undefined;
    disabled?: boolean | undefined;
    onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
    type?: "reset" | "submit" | "button" | undefined;
    shape?: "default" | "rounded" | "rectangular" | undefined;
    children?: React.ReactNode;
} & NativeProps<"--text-color" | "--background-color" | "--border-radius" | "--border-width" | "--border-style" | "--border-color"> & React.RefAttributes<ButtonRef>>;
