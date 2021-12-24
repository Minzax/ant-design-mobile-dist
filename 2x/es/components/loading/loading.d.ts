import React from 'react';
import { NativeProps } from '../../utils/native-props';
export declare type LoadingProps = {
    color?: 'default' | 'primary' | 'white' | (string & {});
} & NativeProps;
export declare const Loading: React.NamedExoticComponent<LoadingProps>;
