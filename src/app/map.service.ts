import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/Rx';

import { District, Type, Picture, Store } from './model';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
};

const formDataOptions = {
  headers: new HttpHeaders({ 'enctype' : 'multipart/form-data' })
};

@Injectable()
export class MapService {
  
  getStores(): Observable<Store[]> {
    const url = `${this.mapUrl}/stores`;
    return this.http.get(url).map(res => {console.log(res["stores"]);return res["stores"]})
    .pipe(
        tap(stores => this.log(`fetched stores`)),
        catchError(this.handleError('getStores', []))
      );
  }

  /** GET store by id. Will 404 if id not found */
  getStore(id: number): Observable<Store> {
    const url = `${this.mapUrl}/stores/findbyid/${id}/1`;
    return this.http.get(url).map(res => {console.log(res["stores"]);return res["stores"]})
    .pipe(
      tap(_ => this.log(`fetched store id=${id}`)),
      catchError(this.handleError<Store>(`getStore id=${id}`))
    );
  }

  getDistricts(): Observable<District[]> {
    const url = `${this.mapUrl}/districts`;
    return this.http.get(url).map(res => {console.log(res["districts"]);return res["districts"]})
    .pipe(
        tap(districts => this.log(`fetched districts`)),
        catchError(this.handleError('getDistricts', []))
      );
  }

  /** GET district by id. Will 404 if id not found */
  getDistrict(id: number): Observable<District> {
    const url = `${this.mapUrl}/districts/findbyid/${id}/1`;
    return this.http.get(url).map(res => {console.log(res["districts"]);return res["districts"]})
    .pipe(
      tap(_ => this.log(`fetched district id=${id}`)),
      catchError(this.handleError<District>(`getDistrict id=${id}`))
    );
  }

  getTypes(): Observable<Type[]> {
    const url = `${this.mapUrl}/types`;
    return this.http.get(url).map(res => {console.log(res["types"]);return res["types"]})
    .pipe(
        tap(types => this.log(`fetched types`)),
        catchError(this.handleError('getTypes', []))
      );
  }

  /** GET type by id. Will 404 if id not found */
  getType(id: number): Observable<Type> {
    const url = `${this.mapUrl}/types/findbyid/${id}/1`;
    return this.http.get(url).map(res => {console.log(res["types"]);return res["types"]})
    .pipe(
      tap(_ => this.log(`fetched types id=${id}`)),
      catchError(this.handleError<Type>(`getType id=${id}`))
    );
  }

  getPictures(): Observable<Picture[]> {
    const url = `${this.mapUrl}/pics`;
    return this.http.get(url).map(res => {console.log(res["pics"]);return res["pics"]})
    .pipe(
        tap(pics => this.log(`fetched pics`)),
        catchError(this.handleError('getPics', []))
      );
  }

  /** GET picture by id. Will 404 if id not found */
  getPicture(id: number): Observable<Picture> {
    const url = `${this.mapUrl}/pics/findbyid/${id}/1`;
    return this.http.get(url).map(res => {console.log(res["pics"]);return res["pics"]})
    .pipe(
      tap(_ => this.log(`fetched pics id=${id}`)),
      catchError(this.handleError<Picture>(`getPics id=${id}`))
    );
  }

  updateItem(item: any, path: string): Observable<any>{
    const url = `${this.mapUrl}/${path}`;
    return this.http.put(url, item, httpOptions).map(res => {console.log(res[path]);return res[path]})
    .pipe(
      tap(_ => this.log(`updated item id=${item.id}`)),
      catchError(this.handleError<any>('updateItem'))
    );
  }

  addItem(item: any, path: string): Observable<any>{
    const url = `${this.mapUrl}/${path}`;
    return this.http.post(url, item, httpOptions).map(res => {console.log(res[path]);return res[path]})
    .pipe(
      tap(_ => this.log(`added item id=${item.id}`)),
      catchError(this.handleError<any>('addItem'))
    );
  }

  deleteItem (id: number, path: string): Observable<any> {
    const url = `${this.mapUrl}/${path}/${id}`;
    return this.http.delete<any>(url, httpOptions).map(res => {console.log(res[path]);return res[path]})
    .pipe(
      tap(_ => this.log(`deleted item id=${id}`)),
      catchError(this.handleError<any>('deleteItem'))
    );
  }

  uploadPic(file: File, storeId: string): Observable<Picture>{
    const url = `${this.mapUrl}/pics/uploadPic`;
    let formData: FormData = new FormData();
    formData.append('picFile', file);
    formData.append('storeId', storeId);
    return this.http.post(url, formData, formDataOptions).map(res => {if(res != null){console.log(res["pics"]);return res["pics"]}})
    .pipe(
      tap(_ => this.log(`uploaded pic`)),
      catchError(this.handleError<Picture>('uploadedPicture'))
    );
  }

  downLoadPic(fileName: string, fileSuffix: string): Observable<any>{
    const url = `${this.mapUrl}/pics/downLoadPic/${fileName}/${fileSuffix}`;
    return this.http.get(url,{responseType: 'text'}).map(res => {return res})
    .pipe(
      tap(_ => this.log(`downloaded pic`)),
      catchError(this.handleError<any>('downLoadPic'))
    );

  }

  constructor(private http: HttpClient,
  private messageService: MessageService) { }

  private mapUrl = 'http://localhost:8080/FoodMap';  // URL to web api

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
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
      this.messageService.add('MapService: ' + message);
    }

}
