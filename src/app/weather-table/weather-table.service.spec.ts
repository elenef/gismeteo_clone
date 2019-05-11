import { TestBed } from '@angular/core/testing';
import { WeatherTableService } from './weather-table.service';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import * as moment from 'moment';

describe('WeatherDataTableService', () => {
  let service: WeatherTableService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  let stubValue;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['get']);

    TestBed.configureTestingModule({
      providers: [WeatherTableService, { provide: ApiService, useValue: spy }]
    });

    service = TestBed.get(WeatherTableService);
    apiServiceSpy = TestBed.get(ApiService);
  });

  beforeEach(() => {
    stubValue = {
      data: {
        weather: [
          {
            date: '2019-12-05',
            hourly: [
              {
                time: '300',
                tempC: '3',
                humidity: '3',
                pressure: '3',
                weatherDesc: [
                  {
                    value: 'Description'
                  }
                ]
              }
            ]
          }
        ]
      }
    };
    apiServiceSpy.get.and.returnValue(
      new Observable(obs => {
        obs.next(stubValue);
      })
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getDataset()', () => {
    it('should return dataset', () => {
      service.getDataset().subscribe(res => {
        expect(res).toEqual([
          {
            id: 0,
            date: moment('2019-12-05')
              .add(3, 'hours')
              .toDate(),
            temperature: 3,
            humidity: 3,
            pressure: 3,
            description: 'Description'
          }
        ]);
      });
    });

    it('should return error message', () => {
      apiServiceSpy.get.and.returnValue(
        new Observable(obs => {
          obs.error({ message: 'oops' });
        })
      );

      service.getDataset().subscribe( () => {}, error => {
          expect(error.message).toBe('oops');
      });
    });

    it('should return dataset for several days', () => {
      stubValue = {
        data: {
          weather: [
            {
              date: '2019-12-05',
              hourly: [
                {
                  time: '300',
                  tempC: '3',
                  humidity: '3',
                  pressure: '3',
                  weatherDesc: [
                    {
                      value: 'Description'
                    }
                  ]
                }
              ]
            },
            {
              date: '2019-12-05',
              hourly: [
                {
                  time: '300',
                  tempC: '3',
                  humidity: '3',
                  pressure: '3',
                  weatherDesc: [
                    {
                      value: 'Description'
                    }
                  ]
                }
              ]
            }
          ],
        }
      };

      apiServiceSpy.get.and.returnValue(
        new Observable(obs => {
          obs.next(stubValue);
        })
      );


      service.getDataset().subscribe(res => {
        expect(res).toEqual([
          {
            id: 0,
            date: moment('2019-12-05')
              .add(3, 'hours')
              .toDate(),
            temperature: 3,
            humidity: 3,
            pressure: 3,
            description: 'Description'
          },
          {
            id: 1,
            date: moment('2019-12-05')
              .add(3, 'hours')
              .toDate(),
            temperature: 3,
            humidity: 3,
            pressure: 3,
            description: 'Description'
          }
        ]);
      });
    });


  });
});
