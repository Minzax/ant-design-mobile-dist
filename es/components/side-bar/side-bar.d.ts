import { FC, ReactNode } from 'react';
import { NativeProps } from '../../utils/native-props';
export declare type SideBarItemProps = {
    title?: string;
    disabled?: boolean;
    badge?: ReactNode;
} & NativeProps;
export declare const SideBarItem: FC<SideBarItemProps>;
export declare type SideBarProps = {
    activeKey?: string | null;
    defaultActiveKey?: string | null;
    onChange?: (key: string) => void;
} & NativeProps<'--width' | '--height' | '--item-border-radius'>;
export declare const SideBar: FC<SideBarProps>;
