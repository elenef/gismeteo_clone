import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDataTableComponent } from './weather-data-table.component';

describe('WeatherDataTableComponent', () => {
  let component: WeatherDataTableComponent;
  let fixture: ComponentFixture<WeatherDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
