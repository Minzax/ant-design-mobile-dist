import React, { ReactNode } from 'react';
import { NativeProps } from '../../utils/native-props';
export interface SelectorOption<V> {
    label: ReactNode;
    value: V;
    disabled?: boolean;
}
export declare type SelectorProps<V> = {
    options: SelectorOption<V>[];
    columns?: number;
    multiple?: boolean;
    disabled?: boolean;
    defaultValue?: V[];
    value?: V[];
    onChange?: (v: V[], extend: {
        items: SelectorOption<V>[];
    }) => void;
} & NativeProps<'--checked-color'>;
export declare const Selector: <V extends string | number>(p: SelectorProps<V>) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
