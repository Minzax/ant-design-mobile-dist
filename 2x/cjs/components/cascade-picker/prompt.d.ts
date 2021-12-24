import { CascadePickerProps } from './cascade-picker';
export declare function prompt(props: Omit<CascadePickerProps, 'value' | 'visible' | 'children'>): Promise<(string | null)[] | null>;
