import { FC, ReactNode } from 'react';
export declare type PullStatus = 'pulling' | 'canRelease' | 'refreshing' | 'complete';
export declare type PullToRefreshProps = {
    onRefresh?: () => Promise<any>;
    pullingText?: ReactNode;
    canReleaseText?: ReactNode;
    refreshingText?: ReactNode;
    completeText?: ReactNode;
    completeDelay?: number;
    headHeight?: number;
    threshold?: number;
    renderText?: (status: PullStatus) => ReactNode;
};
export declare const defaultProps: {
    pullingText: string;
    canReleaseText: string;
    refreshingText: string;
    completeText: string;
    completeDelay: number;
    onRefresh: () => void;
};
export declare const PullToRefresh: FC<PullToRefreshProps>;
