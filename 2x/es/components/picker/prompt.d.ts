import type { PickerProps } from './index';
export declare function prompt(props: Omit<PickerProps, 'value' | 'visible' | 'children'>): Promise<(string | null)[] | null>;
