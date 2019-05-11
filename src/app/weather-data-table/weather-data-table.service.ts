import { WeatherResponse, WeatherElement } from './../api/contracts/weather-response';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiEndpoints } from '../api/api-endpoints';
import { Observable } from 'rxjs';
import { Column, GridOption } from 'angular-slickgrid';
import { SlickgridTableService } from '../shared/services/slickgrid-table.service';
import { WeatherDataset } from '../shared/models/slickgrid/weather-dataset';
import * as moment from 'moment';
import { weatherColumns } from './weather-columns';
import { SelectOption } from '../shared/models/select-option';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataTableService implements SlickgridTableService<WeatherDataset> {
  constructor(private api: ApiService) {}

  get columns(): Column[] {
    return weatherColumns;
  }

  get config(): GridOption {
    return {
      enableAutoResize: true,
      enableCellNavigation: true,
      enableFiltering: true
    };
  }

  get selectOptions(): SelectOption[] {
    return [
      {id: 3, name: '3 часа'},
      {id: 6, name: '6 часа'},
      {id: 12, name: '12 часов'},
      {id: 24, name: '24 часа'},
    ];
  }



  public getDataset(interval = 3): Observable<WeatherDataset[] | object> {
    return new Observable(obs => {
      this.getData(interval).subscribe(
        ({ data }: WeatherResponse) => {
          const dataSet = this.getDatasetByRes(data.weather);
          obs.next(dataSet);
        },
        error => obs.error(error)
      );
    });
  }

  private getData(interval: number): Observable<WeatherResponse | object> {
    const httpParams = new HttpParams({
      fromObject: { key: environment.key, q: 'London', format: 'json', num_of_days: '5', tp: `${interval}` }
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
            .toDate(),
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
