import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {  ReactiveFormsModule } from '@angular/forms';

import { CarsComponent } from './cars/cars.component';
import { CarsCreateComponent } from './cars/cars-create/cars-create.component';
// @ts-ignore
import { CarsEditComponent } from './cars/cars-edit/cars-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    CarsCreateComponent,
    CarsEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
