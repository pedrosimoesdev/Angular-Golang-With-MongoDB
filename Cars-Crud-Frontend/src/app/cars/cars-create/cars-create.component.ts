import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {CarsService} from '../../services/cars.service'

@Component({
  selector: 'app-cars-create',
  templateUrl: './cars-create.component.html',
  styleUrls: ['./cars-create.component.scss']
})
export class CarsCreateComponent implements OnInit {

  checkoutForm = this.formBuilder.group({
    Car: ['', Validators.required],
    Model: ['', Validators.required],
    Year: ['', Validators.required],

  });

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarsService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){

    let Car = this.checkoutForm.value.Car;
    let Model = this.checkoutForm.value.Model;
    let Year = this.checkoutForm.value.Year;

    console.log(Car)
    console.log(Model)
    console.log(Year)

    let car = { Car, Model, Year};

    if(Car === '' || Model === '' || Year ===  '' ){
      alert('Please fill all inputs')
      return;
    }
    //call service to insert valus of database
    this.carService.createCar(car).subscribe(result => {
      alert(result)
      //this.checkoutForm.reset();
    //  this.router.navigate(['/']);

    })

  }

}
