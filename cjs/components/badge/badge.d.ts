import React, { FC } from 'react';
import { NativeProps } from '../../utils/native-props';
export declare const dot: unique symbol;
export declare type BadgeProps = {
    content?: React.ReactNode | typeof dot;
    color?: string;
} & NativeProps<'--right' | '--top'>;
export declare const Badge: FC<BadgeProps>;
