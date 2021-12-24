import { FC } from 'react';
import { NativeProps } from '../../utils/native-props';
export declare type ListProps = {
    mode?: 'default' | 'card';
} & NativeProps<'--prefix-width' | '--align-items' | '--active-background-color' | '--border-inner' | '--border-top' | '--border-bottom' | '--padding-left'>;
export declare const List: FC<ListProps>;
