import { FC, ReactNode } from 'react';
import { NativeProps } from '../../utils/native-props';
export declare type CapsuleTabProps = {
    title: ReactNode;
    disabled?: boolean;
    forceRender?: boolean;
} & NativeProps;
export declare const CapsuleTab: FC<CapsuleTabProps>;
export declare type CapsuleTabsProps = {
    activeKey?: string | null;
    defaultActiveKey?: string | null;
    onChange?: (key: string) => void;
} & NativeProps;
export declare const CapsuleTabs: FC<CapsuleTabsProps>;