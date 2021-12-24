/// <reference types="react" />
import './index.less';
import { useForm } from 'rc-field-form';
export declare type FormLayout = 'vertical' | 'horizontal';
export type { FormProps } from './form';
export type { FormInstance } from 'rc-field-form';
declare const _default: import("react").ForwardRefExoticComponent<import("rc-field-form").FormProps<any> & import("../../utils/native-props").NativeProps<never> & Partial<import("./context").FormContextType> & {
    footer?: import("react").ReactNode;
    layout?: "horizontal" | "vertical" | undefined;
    mode?: "default" | "card" | undefined;
} & import("react").RefAttributes<import("rc-field-form").FormInstance<any>>> & {
    Item: import("react").FC<import("./form-item").FormItemProps>;
    useForm: typeof useForm;
};
export default _default;
