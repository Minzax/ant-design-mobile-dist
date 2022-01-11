import { FC, ReactNode } from 'react';
import { NativeProps } from '../../utils/native-props';
import { BadgeProps } from '../badge';
export declare type TabBarItemProps = {
    icon?: ReactNode | ((active: boolean) => ReactNode);
    title?: ReactNode;
    badge?: BadgeProps['content'];
} & NativeProps;
export declare const TabBarItem: FC<TabBarItemProps>;
export declare type TabBarProps = {
    activeKey?: string | null;
    defaultActiveKey?: string | null;
    onChange?: (key: string) => void;
    safeArea?: boolean;
} & NativeProps;
export declare const TabBar: FC<TabBarProps>;
