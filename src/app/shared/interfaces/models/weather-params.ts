import { IntervalType } from '../../types/select-option-types';

export interface WeatherParams {
    key: string;
    q: string;
    format: string;
    num_of_days: string;
    tp: IntervalType;
}
