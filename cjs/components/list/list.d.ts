import { FC, ReactNode } from 'react';
import { NativeProps } from '../../utils/native-props';
export declare type ListProps = {
    header?: ReactNode;
    mode?: 'default' | 'card';
} & NativeProps<'--prefix-width' | '--align-items' | '--active-background-color' | '--border-inner' | '--border-top' | '--border-bottom' | '--padding-left'>;
export declare const List: FC<ListProps>;
