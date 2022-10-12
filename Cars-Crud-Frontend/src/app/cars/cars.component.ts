import { Component, OnInit } from '@angular/core';
import {CarsService} from '../services/cars.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  constructor(
    private carService: CarsService,
    private router: Router
  ){

  }
  title = 'Show Cars'
  Cars : any;

  ngOnInit(): void {
    this.getCars()
  }

  getCars(){
    //call services to get all records
    this.carService.getCars().subscribe(result => {
      this.Cars=result['results'];
      console.log(this.Cars)
    })
  }

  updateRecord(id: number, name: string, model: string, year: number){

    this.router.navigate(['/cars/edit', id,name,model,year]);


  }

  deleteRecords(id: any){
    if(confirm("Are you sure to delete " )) {
      //call services to get all records
      this.carService.deleteCar(id).subscribe(result => {
        alert(result)
        this.getCars()
      })
    }
  }


}
