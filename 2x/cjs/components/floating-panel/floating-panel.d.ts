import React, { ReactNode } from 'react';
import { NativeProps } from '../../utils/native-props';
export declare type FloatingPanelProps = {
    anchors: number[];
    children: ReactNode;
} & NativeProps<'--border-radius' | '--z-index'>;
export declare type FloatingPanelRef = {
    setHeight: (height: number, options?: {
        immediate?: boolean;
    }) => void;
};
export declare const FloatingPanel: React.ForwardRefExoticComponent<{
    anchors: number[];
    children: ReactNode;
} & NativeProps<"--z-index" | "--border-radius"> & React.RefAttributes<FloatingPanelRef>>;
