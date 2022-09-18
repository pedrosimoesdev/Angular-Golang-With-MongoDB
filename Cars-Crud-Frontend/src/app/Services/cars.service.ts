import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
// @ts-ignore
import { Cars } from '../model/cars'

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private SERVER = "http://localhost:3333/";

  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<Cars> {
    return this.httpClient
      .get<Cars>(this.SERVER )
      .pipe(retry(1), catchError(this.handleError));
  }

  createCar( data: any) {
    return this.httpClient.post<Cars>(this.SERVER + 'insert' , data, {})
      .pipe(catchError((e) => this.handleError(e)));
  }

  editCar( data: any) {
    return this.httpClient.put<Cars>(this.SERVER + 'update' , data, {})
      .pipe(catchError((e) => this.handleError(e)));
  }


  deleteCar( id: any) {
    return this.httpClient.delete<Cars>(this.SERVER + 'delete' , {body: id}, )
      .pipe(catchError((e) => this.handleError(e)));
  }


  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }


}
