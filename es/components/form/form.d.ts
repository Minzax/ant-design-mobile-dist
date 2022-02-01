import React, { ReactNode } from 'react';
import { NativeProps } from '../../utils/native-props';
import { ListProps } from '../list';
import type { FormProps as RcFormProps, FormInstance as RCFormInstance } from 'rc-field-form';
import { FormContextType } from './context';
import type { FormLayout } from '.';
export declare type FormInstance = Pick<RCFormInstance, 'getFieldValue' | 'getFieldsValue' | 'getFieldError' | 'getFieldsError' | 'isFieldTouched' | 'isFieldsTouched' | 'resetFields' | 'setFields' | 'setFieldsValue' | 'submit' | 'validateFields'>;
export declare type FormProps = Pick<RcFormProps, 'form' | 'initialValues' | 'name' | 'preserve' | 'validateMessages' | 'validateTrigger' | 'onFieldsChange' | 'onFinish' | 'onFinishFailed' | 'onValuesChange' | 'children'> & NativeProps & Partial<FormContextType> & {
    footer?: ReactNode;
    layout?: FormLayout;
    mode?: ListProps['mode'];
};
export declare const Form: React.ForwardRefExoticComponent<Pick<RcFormProps<any>, "children" | "form" | "name" | "initialValues" | "preserve" | "validateMessages" | "validateTrigger" | "onFieldsChange" | "onFinish" | "onFinishFailed" | "onValuesChange"> & NativeProps<never> & Partial<FormContextType> & {
    footer?: ReactNode;
    layout?: "horizontal" | "vertical" | undefined;
    mode?: ListProps['mode'];
} & React.RefAttributes<Pick<RCFormInstance<any>, "submit" | "getFieldValue" | "getFieldsValue" | "getFieldError" | "getFieldsError" | "isFieldTouched" | "isFieldsTouched" | "resetFields" | "setFields" | "setFieldsValue" | "validateFields">>>;
