import { DialogProps } from './dialog';
export declare type DialogShowProps = Omit<DialogProps, 'visible'>;
export declare type DialogShowRef = {
    close: () => void;
};
export declare function show(props: DialogShowProps): {
    close: () => void;
};
