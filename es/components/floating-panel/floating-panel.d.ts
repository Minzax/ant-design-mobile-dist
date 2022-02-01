import React, { ReactNode } from 'react';
import { NativeProps } from '../../utils/native-props';
export declare type FloatingPanelProps = {
    anchors: number[];
    children: ReactNode;
    headerChildren?: ReactNode;
    onIndexDragEndChange?: (index: number) => void;
    onHeightChange?: (height: number, animating: boolean) => void;
} & NativeProps<'--border-radius' | '--z-index'>;
export declare type FloatingPanelRef = {
    setHeight: (height: number, options?: {
        immediate?: boolean;
    }) => void;
};
export declare const FloatingPanel: React.ForwardRefExoticComponent<{
    anchors: number[];
    children: ReactNode;
    headerChildren?: ReactNode;
    onIndexDragEndChange?: ((index: number) => void) | undefined;
    onHeightChange?: ((height: number, animating: boolean) => void) | undefined;
} & NativeProps<"--z-index" | "--border-radius"> & React.RefAttributes<FloatingPanelRef>>;
