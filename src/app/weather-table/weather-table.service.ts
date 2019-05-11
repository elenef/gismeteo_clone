import { WeatherResponse, WeatherElement } from '../api/contracts/weather-response';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpParams } from '@angular/common/http';
import { ApiEndpoints } from '../api/api-endpoints';
import { Observable } from 'rxjs';
import { GridOption, Column } from 'angular-slickgrid';
import { SlickgridTableService } from '../shared/services/slickgrid-table.service';
import { WeatherData } from '../shared/models/slickgrid/weather-data';
import * as moment from 'moment';
import { weatherColumns, intervalOptions } from './weather-data';
import { SelectOption, IntervalType } from '../shared/models/select-option';
import { WeatherParams } from '../shared/models/weather-params';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherTableService implements SlickgridTableService<WeatherData, WeatherParams> {
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

  get intervalOptions(): SelectOption<IntervalType>[] {
    return intervalOptions;
  }

  get params(): WeatherParams {
    return {
      key: environment.key,
      q: 'London',
      format: 'json',
      num_of_days: '5',
      tp: '3'
    };
  }

  public getDataset(params?: WeatherParams): Observable<WeatherData[] | object> {
    return new Observable(obs => {
      this.getData(params).subscribe(
        ({ data }: WeatherResponse) => {
          let dataSet = [];

          data.weather.forEach((weatherDay, i) => {
            dataSet = [...dataSet, ...this.getDayDataset(weatherDay, i)];
          });

          obs.next(dataSet);
        },
        error => obs.error(error)
      );
    });
  }

  private getData(params?: WeatherParams): Observable<WeatherResponse | object> {
    const url = ApiEndpoints.weather().listUrl();
    const httpParams = new HttpParams({ fromObject: { ...params } });

    return this.api.get(url, httpParams);
  }

  private getDayDataset(weatherDay: WeatherElement, dayNumber: number): WeatherData[] {
    const dataset = [];

    weatherDay.hourly.forEach((item, k, array) => {
      const id = dayNumber * array.length + k;

      dataset.push({
        id,
        date: this.getHourlyDate(weatherDay.date, +item.time.slice(0, -2)), // time format: hmm
        temperature: +item.tempC,
        humidity: +item.humidity,
        pressure: +item.pressure,
        description: item.weatherDesc[0].value
      });
    });

    return dataset;
  }

  private getHourlyDate(date: string, hours: number): Date {
    return moment(date)
      .add(hours, 'hours')
      .toDate();
  }
}
