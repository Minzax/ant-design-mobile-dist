import { FC } from 'react';
export declare const Slides: FC<{
    images: string[];
    onTap: () => void;
    maxZoom: number;
    defaultIndex: number;
    onIndexChange?: (index: number) => void;
}>;
