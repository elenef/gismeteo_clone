import { IntervalType } from './select-option';

export interface WeatherParams {
    key: string;
    q: string;
    format: string;
    num_of_days: string;
    tp: IntervalType;
}
