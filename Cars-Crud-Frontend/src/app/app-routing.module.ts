import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './cars/cars.component';
import { CarsCreateComponent } from './cars/cars-create/cars-create.component';
import { CarsEditComponent } from './Cars/cars-edit/cars-edit.component';


const routes: Routes = [
  { path: "", component: CarsComponent},
  { path: "cars/create", component: CarsCreateComponent},
  { path: "cars/edit/:id/:name/:model/:year", component: CarsEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
