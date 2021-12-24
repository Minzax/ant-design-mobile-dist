import { ModalProps } from './modal';
export declare type ModalShowProps = Omit<ModalProps, 'visible'>;
export declare type ModalShowRef = {
    close: () => void;
};
export declare function show(props: ModalShowProps): {
    close: () => void;
};
