/// <reference types="react" />
import './index.less';
import { useForm } from 'rc-field-form';
export declare type FormLayout = 'vertical' | 'horizontal';
export type { FormProps, FormInstance } from './form';
export type { FormItemProps } from './form-item';
export type { ValidateMessages, FieldData, NamePath, } from 'rc-field-form/es/interface';
declare const _default: import("react").ForwardRefExoticComponent<Pick<import("rc-field-form").FormProps<any>, "children" | "form" | "name" | "initialValues" | "preserve" | "validateMessages" | "validateTrigger" | "onFieldsChange" | "onFinish" | "onFinishFailed" | "onValuesChange"> & import("../../utils/native-props").NativeProps<never> & Partial<import("./context").FormContextType> & {
    footer?: import("react").ReactNode;
    layout?: "horizontal" | "vertical" | undefined;
    mode?: "default" | "card" | undefined;
} & import("react").RefAttributes<Pick<import("rc-field-form").FormInstance<any>, "submit" | "getFieldValue" | "getFieldsValue" | "getFieldError" | "getFieldsError" | "isFieldTouched" | "isFieldsTouched" | "resetFields" | "setFields" | "setFieldsValue" | "validateFields">>> & {
    Item: import("react").FC<import("./form-item").FormItemProps>;
    Header: import("react").FC<{}>;
    useForm: typeof useForm;
};
export default _default;
