import { Column, FieldType, Formatters, Filters } from 'angular-slickgrid';

export const weatherColumns: Column[] = [
  {
    id: 'date',
    name: 'Date',
    field: 'date',
    sortable: true,
    type: FieldType.date,
    formatter: Formatters.dateTimeIsoAmPm,
    filterable: true,
    filter: { model: Filters.compoundDate }
  },
  {
    id: 'temperature',
    name: 'Temperature, °С',
    field: 'temperature',
    sortable: true,
    type: FieldType.number,
    filterable: true,
    filter: { model: Filters.compoundInputNumber }
  },
  {
    id: 'humidity',
    name: 'Humidity, %',
    field: 'humidity',
    sortable: true,
    type: FieldType.number,
    filterable: true,
    filter: { model: Filters.compoundInputNumber }
  },
  {
    id: 'pressure',
    name: 'Pressure, mm Hg',
    field: 'pressure',
    sortable: true,
    type: FieldType.number,
    filterable: true,
    filter: { model: Filters.compoundInputNumber }
  },
  { id: 'description', name: 'Description', field: 'description', filterable: true }
];
