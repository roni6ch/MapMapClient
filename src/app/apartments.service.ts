import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IApartments } from './iapartments';

@Injectable({
  providedIn: 'root'
})
export class ApartmentsService {

  private _url = "../assets/result.json";
  
  constructor(private http : HttpClient) { }

  getData(): Observable<IApartments[]>{
    return this.http.get<IApartments[]>(this._url);
  }
}
