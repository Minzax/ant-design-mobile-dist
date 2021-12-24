import { FC } from 'react';
import { NativeProps } from '../../utils/native-props';
declare type Direction = 'horizontal' | 'vertical';
export declare type StepsProps = {
    current?: number;
    direction?: Direction;
} & NativeProps;
export declare const Steps: FC<StepsProps>;
export {};
