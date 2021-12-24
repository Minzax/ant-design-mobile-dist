import { FC } from 'react';
import { NativeProps } from '../../utils/native-props';
export declare type EllipsisProps = {
    content: string;
    direction?: 'start' | 'end' | 'middle';
    rows?: number;
    expandText?: string;
    collapseText?: string;
} & NativeProps;
export declare const Ellipsis: FC<EllipsisProps>;
