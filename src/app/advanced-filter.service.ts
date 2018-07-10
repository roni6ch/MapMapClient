import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IAdvancedFilter } from './i-advanced-filter';

@Injectable({
  providedIn: 'root'
})
export class AdvancedFilterService {


  private _url = "./assets/advancedFilter.json";
  
  constructor(private http : HttpClient) { }

  getData(): Observable<IAdvancedFilter[]>{
    return this.http.get<IAdvancedFilter[]>(this._url);
  }
}
