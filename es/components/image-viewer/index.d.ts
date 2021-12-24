/// <reference types="react" />
import './image-viewer.less';
import { showMultiImageViewer, showImageViewer, clearImageViewer } from './methods';
export type { ImageViewerProps, MultiImageViewerProps } from './image-viewer';
declare const _default: import("react").FC<import("./image-viewer").ImageViewerProps> & {
    Multi: import("react").FC<import("./image-viewer").MultiImageViewerProps> & {
        show: typeof showMultiImageViewer;
    };
    show: typeof showImageViewer;
    clear: typeof clearImageViewer;
};
export default _default;
