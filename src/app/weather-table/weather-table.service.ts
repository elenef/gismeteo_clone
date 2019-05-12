import { WeatherResponse, WeatherElement } from '../api/contracts/weather-response';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpParams } from '@angular/common/http';
import { ApiEndpoints } from '../api/api-endpoints';
import { Observable } from 'rxjs';
import { GridOption, Column } from 'angular-slickgrid';
import { SlickgridTableService } from '../shared/interfaces/services/slickgrid-table.service';
import * as moment from 'moment';
import { weatherColumns, intervalOptions } from './weather-table-data';
import { SelectOption } from '../shared/interfaces/models/select-option';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../shared/interfaces/models/weather-data';
import { WeatherParams } from '../shared/interfaces/models/weather-params';
import { IntervalType } from '../shared/types/select-option-types';

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
      enableFiltering: true,
      autoResize: {
        containerId: 'table'
      }
    };
  }

  /**
   * Все опции селекта интервала времени для данных погоды
   */
  get intervalOptions(): SelectOption<IntervalType>[] {
    return intervalOptions;
  }

  /**
   * Все параметры запроса погоды
   */
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

  /**
   *  Получить данные о погоде
   *  @param params - параметры запроса погоды
   */
  private getData(params?: WeatherParams): Observable<WeatherResponse | object> {
    const url = ApiEndpoints.weather().listUrl();
    const httpParams = new HttpParams({ fromObject: { ...params } });

    return this.api.get(url, httpParams);
  }

  /**
   *  Получить данные о погоде одного дня
   *  @param weatherDay - погода дня
   *  @param dayNumber - номер дня (по счету)
   */
  private getDayDataset(weatherDay: WeatherElement, dayNumber: number): WeatherData[] {
    const dataset = [];

    weatherDay.hourly.forEach((item, k, array) => {
      const id = dayNumber * array.length + k;

      dataset.push({
        id,
        date: this.getHourlyDate(weatherDay.date, +item.time.slice(0, -2)), // формат времени: hmm
        temperature: +item.tempC,
        humidity: +item.humidity,
        pressure: +item.pressure,
        description: item.weatherDesc[0].value
      });
    });

    return dataset;
  }


  /**
   *  Получить дату конкретного часа погоды
   *  @param date - дата
   *  @param hours - количество прошедших часов от начала даты
   */
  private getHourlyDate(date: string, hours: number): Date {
    return moment(date)
      .add(hours, 'hours')
      .toDate();
  }
}
