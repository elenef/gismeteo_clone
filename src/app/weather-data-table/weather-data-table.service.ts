import { WeatherResponse, Data, WeatherElement } from './../api/contracts/weather-response';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiEndpoints } from '../api/api-endpoints';
import { Observable } from 'rxjs';
import { FieldType, Column, GridOption } from 'angular-slickgrid';
import { SlickgridTableService } from '../shared/services/slickgrid-table.service';
import { WeatherDataset } from '../shared/models/slickgrid/weather-dataset';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataTableService implements SlickgridTableService<WeatherDataset> {
  constructor(private api: ApiService) {}

  get columns(): Column[] {
    return [
      { id: 'date', name: 'Date', field: 'date', sortable: true, type: FieldType.dateTimeIsoAmPm },
      { id: 'temperature', name: 'Temperature, °С', field: 'temperature', sortable: true, type: FieldType.number },
      { id: 'humidity', name: 'Humidity, %', field: 'humidity', sortable: true, type: FieldType.number },
      { id: 'pressure', name: 'Pressure, mm Hg', field: 'pressure', sortable: true, type: FieldType.number },
      { id: 'description', name: 'Description', field: 'description' }
    ];
  }

  get config(): GridOption {
    return {
      enableAutoResize: true,
      enableCellNavigation: true,
      enableFiltering: true
    };
  }

  public getDataset(): Observable<WeatherDataset[] | object> {
    return new Observable(obs => {
      this.getData().subscribe(
        ({ data }: WeatherResponse) => {
          const dataSet = this.getDatasetByRes(data.weather);
          obs.next(dataSet);
        },
        error => obs.error(error)
      );
    });
  }

  private getData(): Observable<WeatherResponse | object> {
    const httpParams = new HttpParams({
      fromObject: { key: environment.key, q: 'London', format: 'json', num_of_days: '5' }
    });

    const url = ApiEndpoints.weather().listUrl();
    return this.api.get(url, httpParams);
  }

  private getDatasetByRes(weather: WeatherElement[]): WeatherDataset[] {
    const dataset = [];
    weather.forEach((weatherDay, i) => {
      weatherDay.hourly.forEach((item, k, array) => {
        const id = i * array.length + k;
        dataset.push({
          id,
          date: moment(weatherDay.date)
            .add(+item.time.slice(0, item.time.length - 2), 'hours')
            .format('YYYY-MM-DD h:mm:ss a'),
          temperature: +item.tempC,
          humidity: +item.humidity,
          pressure: +item.pressure,
          description: item.weatherDesc[0].value
        });
      });
    });
    return dataset;
  }
}
