import { Component, OnInit } from '@angular/core';
import { Column, GridOption } from 'angular-slickgrid';
import { WeatherData } from '../shared/models/slickgrid/weather-data';
import { SelectOption, IntervalType } from '../shared/models/select-option';
import { WeatherTableService } from './weather-table.service';
import { WeatherParams } from '../shared/models/weather-params';

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.scss']
})
export class WeatherTableComponent implements OnInit {
  weatherTable: {
    columns?: Column[];
    gridOptions?: GridOption;
    dataset?: WeatherData[];
  };

  intervalOptions: SelectOption<IntervalType>[];
  params: WeatherParams;

  constructor(private service: WeatherTableService) {}

  ngOnInit(): void {
    this.weatherTable = {
      columns: this.service.columns,
      gridOptions: this.service.config
    };

    this.intervalOptions = this.service.intervalOptions;
    this.params = this.service.params;

    this.getDataset();
  }

  getDataset() {
    this.service.getDataset(this.params).subscribe((dataset: WeatherData[]) => {
      this.weatherTable.dataset = dataset;
    });
  }
}
