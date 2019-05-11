import { Component, OnInit } from '@angular/core';
import { Column, GridOption } from 'angular-slickgrid';
import { WeatherDataTableService } from './weather-data-table.service';
import { WeatherDataset } from '../shared/models/slickgrid/weather-dataset';
import * as moment from 'moment';

@Component({
  selector: 'app-weather-data-table',
  templateUrl: './weather-data-table.component.html',
  styleUrls: ['./weather-data-table.component.scss']
})
export class WeatherDataTableComponent implements OnInit {
  constructor(private service: WeatherDataTableService) {}

  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: WeatherDataset[];

  ngOnInit(): void {
    this.columnDefinitions = this.service.columns;
    this.gridOptions = this.service.config;

    this.service.getDataset().subscribe((dataset: WeatherDataset[]) => {
      this.dataset = dataset;
    });
 }
}
