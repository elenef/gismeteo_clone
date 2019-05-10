import { Observable } from 'rxjs';
import { Column, GridOption } from 'angular-slickgrid';

export interface SlickgridTableService<T> {
    columns: Column[];
    config: GridOption;

    getDataset(): Observable<T[] | object>;
}