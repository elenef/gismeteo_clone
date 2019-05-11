import { Column, FieldType, Formatters, Filters} from 'angular-slickgrid';
import { IntervalType, SelectOption } from '../shared/models/select-option';

/**
 * Конфигурация колонок таблицы погоды
 */
export const weatherColumns: Column[] = [
  {
    id: 'date',
    name: 'Date',
    field: 'date',
    minWidth: 180,
    sortable: true,
    type: FieldType.date,
    formatter: Formatters.dateTimeIsoAmPm,
    outputType: FieldType.dateTimeIsoAmPm,
    filterable: true,
    filter: { model: Filters.compoundDate }
  },
  {
    id: 'temperature',
    name: 'Temperature, °С',
    field: 'temperature',
    minWidth: 80,
    sortable: true,
    type: FieldType.number,
    filterable: true,
    filter: { model: Filters.compoundInputNumber }
  },
  {
    id: 'humidity',
    name: 'Humidity, %',
    field: 'humidity',
    minWidth: 80,
    sortable: true,
    type: FieldType.number,
    filterable: true,
    filter: { model: Filters.compoundInputNumber }
  },
  {
    id: 'pressure',
    name: 'Pressure, mm Hg',
    field: 'pressure',
    minWidth: 80,
    sortable: true,
    type: FieldType.number,
    filterable: true,
    filter: { model: Filters.compoundInputNumber }
  },
  { id: 'description', name: 'Description', field: 'description', minWidth: 250, filterable: true }
];

/**
 * Список опций для селекта по интервалу
 */
export const intervalOptions: SelectOption<IntervalType>[] = [
  { id: '3', displayedText: '3 часа' },
  { id: '6', displayedText: '6 часа' },
  { id: '12', displayedText: '12 часов' },
  { id: '24', displayedText: '24 часа' }
];
