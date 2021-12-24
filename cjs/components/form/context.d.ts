import React from 'react';
import { FormLayout } from '.';
import type { Meta, InternalNamePath } from 'rc-field-form/lib/interface';
export declare type FormContextType = {
    hasFeedback: boolean;
    layout: FormLayout;
};
export declare const DEFAULT_FORM_CONTEXT: FormContextType;
export declare const FormContext: React.Context<FormContextType>;
export declare type OnSubMetaChange = (meta: Meta & {
    destroy?: boolean;
}, namePath: InternalNamePath) => void;
export declare const NoStyleItemContext: React.Context<OnSubMetaChange | null>;
