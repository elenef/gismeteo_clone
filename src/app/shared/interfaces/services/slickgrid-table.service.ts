import { Observable } from 'rxjs';
import { Column, GridOption } from 'angular-slickgrid';

export interface SlickgridTableService<T, TParams> {
    /**
     * Определение всех колонок таблицы slickgrid
     */
    columns: Column[];
    /**
     * Конфигурация таблицы slickgrid
     */
    config: GridOption;

    /**
     * Получить набор данных для отображения в таблице
     */
    getDataset(params?: TParams): Observable<T[] | object>;
}