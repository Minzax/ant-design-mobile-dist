import { FC } from 'react';
import { GetContainer } from '../../utils/render-to-container';
export declare type ImageViewerProps = {
    image?: string;
    maxZoom?: number;
    getContainer?: GetContainer;
    visible?: boolean;
    onClose?: () => void;
    afterClose?: () => void;
};
export declare const ImageViewer: FC<ImageViewerProps>;
export declare type MultiImageViewerProps = Omit<ImageViewerProps, 'image'> & {
    images?: string[];
    defaultIndex?: number;
    onIndexChange?: (index: number) => void;
};
export declare const MultiImageViewer: FC<MultiImageViewerProps>;
