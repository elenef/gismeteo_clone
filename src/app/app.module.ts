import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ApiService } from './api/api.service';
import { BasicApiService } from './api/basic-api.service';
import { WeatherTableComponent } from './weather-table/weather-table.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularSlickgridModule.forRoot(),
    TranslateModule.forRoot(),
    FormsModule,
  ],
  providers: [
    { provide: ApiService, useClass: BasicApiService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
