import { FC } from 'react';
import { NativeProps } from '../../utils/native-props';
export declare type CalendarProps = {
    weekStartsOn?: 'Monday' | 'Sunday';
    renderLabel?: (date: Date) => string | null | undefined;
} & ({
    selectionMode?: undefined;
    value?: undefined;
    defaultValue?: undefined;
    onChange?: undefined;
} | {
    selectionMode: 'single';
    value?: Date | null;
    defaultValue?: Date | null;
    onChange?: (val: Date) => void;
} | {
    selectionMode: 'range';
    value?: [Date, Date] | null;
    defaultValue?: [Date, Date] | null;
    onChange?: (val: [Date, Date]) => void;
}) & NativeProps;
export declare const Calendar: FC<CalendarProps>;
