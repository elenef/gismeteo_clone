import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WeatherDataTableComponent } from './weather-data-table/weather-data-table.component';
import { ApiService } from './api/api.service';
import { BasicApiService } from './api/basic-api.service';

@NgModule({
  declarations: [
    AppComponent,
    WeatherDataTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularSlickgridModule.forRoot(),
    TranslateModule.forRoot(),
  ],
  providers: [
    { provide: ApiService, useClass: BasicApiService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
