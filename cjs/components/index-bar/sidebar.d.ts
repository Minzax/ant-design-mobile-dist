import { FC } from 'react';
declare type SidebarProps = {
    indexes: string[];
    activeIndex: string;
    onActive: (index: string) => void;
};
export declare const Sidebar: FC<SidebarProps>;
export {};
