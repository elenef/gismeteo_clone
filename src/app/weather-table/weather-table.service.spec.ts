import { TestBed } from '@angular/core/testing';

import { WeatherTableService } from './weather-table.service';

describe('WeatherDataTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherTableService = TestBed.get(WeatherTableService);
    expect(service).toBeTruthy();
  });
});
