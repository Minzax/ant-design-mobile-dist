import { FC, InputHTMLAttributes } from 'react';
import { NativeProps } from '../../utils/native-props';
export declare type TaskStatus = 'pending' | 'fail';
export interface ImageUploadItem {
    key?: string | number;
    url: string;
    thumbnailUrl?: string;
    extra?: any;
}
export declare type ImageUploaderProps = {
    defaultValue?: ImageUploadItem[];
    value?: ImageUploadItem[];
    onChange?: (items: ImageUploadItem[]) => void;
    accept?: string;
    multiple?: boolean;
    maxCount?: number;
    onCountExceed?: (exceed: number) => void;
    disableUpload?: boolean;
    showUpload?: boolean;
    deletable?: boolean;
    capture?: InputHTMLAttributes<unknown>['capture'];
    onPreview?: (index: number) => void;
    beforeUpload?: (file: File[]) => Promise<File[]> | File[];
    upload: (file: File) => Promise<ImageUploadItem>;
    onDelete?: (item: ImageUploadItem) => boolean | Promise<boolean> | void;
} & NativeProps<'--cell-size'>;
export declare const ImageUploader: FC<ImageUploaderProps>;