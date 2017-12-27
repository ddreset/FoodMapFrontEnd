import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/Rx';
import { District, Type, Picture, Store } from './model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
};

const formDataOptions = {
  headers: new HttpHeaders({ 'enctype' : 'multipart/form-data' })
};

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  private mapUrl = 'http://localhost:8080/FoodMap';  // URL to web api

  getDistricts(): Observable<District[]> {
    const url = `${this.mapUrl}/district/1`;
    return this.http.get(url).map(res => {console.log(res["district"]);return res["district"]})
    .pipe(
        catchError(this.handleError('getDistricts', []))
      );
  }

  getTypes(): Observable<Type[]> {
    const url = `${this.mapUrl}/type/1`;
    return this.http.get(url).map(res => {console.log(res["type"]);return res["type"]})
    .pipe(
        catchError(this.handleError('getTypes', []))
      );
  }

  getRandomStore(district: number, type: number): Observable<any> {
    const url = `${this.mapUrl}/random/${district}/${type}`;
    return this.http.get(url).map(res => {console.log(res["store"]);return res})
    .pipe(
        catchError(this.handleError('getRandomStore', []))
      );
  }

  downLoadPic(fileName: string, fileSuffix: string): Observable<any>{
    const url = `${this.mapUrl}/pic/${fileName}/${fileSuffix}`;
    return this.http.get(url,{responseType: 'text'}).map(res => {return res})
    .pipe(
      catchError(this.handleError<any>('downLoadPic'))
    );

  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
