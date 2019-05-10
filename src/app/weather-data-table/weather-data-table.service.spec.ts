import { TestBed } from '@angular/core/testing';

import { WeatherDataTableService } from './weather-data-table.service';

describe('WeatherDataTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherDataTableService = TestBed.get(WeatherDataTableService);
    expect(service).toBeTruthy();
  });
});
