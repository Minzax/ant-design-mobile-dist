import React, { FC } from 'react';
import { NativeProps } from '../../utils/native-props';
import { GetContainer } from '../../utils/render-to-container';
import { PropagationEvent } from '../../utils/with-stop-propagation';
export declare type PopupProps = {
    visible?: boolean;
    mask?: boolean;
    onMaskClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    destroyOnClose?: boolean;
    forceRender?: boolean;
    getContainer?: GetContainer;
    afterShow?: () => void;
    afterClose?: () => void;
    position?: 'bottom' | 'top' | 'left' | 'right';
    bodyClassName?: string;
    bodyStyle?: React.CSSProperties;
    maskClassName?: string;
    maskStyle?: React.CSSProperties;
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    stopPropagation?: PropagationEvent[];
} & NativeProps<'--z-index'>;
export declare const Popup: FC<PopupProps>;
