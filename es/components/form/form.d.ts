import React, { ReactNode } from 'react';
import { NativeProps } from '../../utils/native-props';
import { ListProps } from '../list';
import type { FormProps as RcFormProps, FormInstance } from 'rc-field-form';
import { FormContextType } from './context';
import type { FormLayout } from '.';
export declare type FormProps = RcFormProps & NativeProps & Partial<FormContextType> & {
    footer?: ReactNode;
    layout?: FormLayout;
    mode?: ListProps['mode'];
};
export declare const Form: React.ForwardRefExoticComponent<RcFormProps<any> & NativeProps<never> & Partial<FormContextType> & {
    footer?: ReactNode;
    layout?: "horizontal" | "vertical" | undefined;
    mode?: ListProps['mode'];
} & React.RefAttributes<FormInstance<any>>>;
