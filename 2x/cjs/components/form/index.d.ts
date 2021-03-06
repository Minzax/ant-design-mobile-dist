/// <reference types="react" />
import './index.less';
import { useForm } from 'rc-field-form';
export declare type FormLayout = 'vertical' | 'horizontal';
export type { FormProps, FormInstance } from './form';
export type { FormItemProps } from './form-item';
export type { FormSubscribeProps } from './form-subscribe';
export type { ValidateMessages, FieldData, NamePath, } from 'rc-field-form/es/interface';
export type { FormArrayField, FormArrayOperation, FormArrayProps, } from './form-array';
declare const _default: import("react").ForwardRefExoticComponent<Pick<import("rc-field-form").FormProps<any>, "children" | "form" | "name" | "initialValues" | "preserve" | "validateMessages" | "validateTrigger" | "onFieldsChange" | "onFinish" | "onFinishFailed" | "onValuesChange"> & import("../../utils/native-props").NativeProps<"--border-inner" | "--border-top" | "--border-bottom"> & Partial<import("./context").FormContextType> & {
    footer?: import("react").ReactNode;
    layout?: FormLayout | undefined;
    mode?: "default" | "card" | undefined;
} & import("react").RefAttributes<import("./form").FormInstance>> & {
    Item: import("react").FC<import("./form-item").FormItemProps>;
    Subscribe: import("react").VFC<import("./form-subscribe").FormSubscribeProps>;
    Header: import("react").FC<{
        children?: import("react").ReactNode;
    }>;
    Array: import("react").FC<import("./form-array").FormArrayProps>;
    useForm: typeof useForm;
};
export default _default;
