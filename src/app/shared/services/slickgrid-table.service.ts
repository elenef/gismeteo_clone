import { Observable } from 'rxjs';
import { Column, GridOption } from 'angular-slickgrid';

export interface SlickgridTableService<T, TParams> {
    columns: Column[];
    config: GridOption;

    getDataset(params?: TParams): Observable<T[] | object>;
}