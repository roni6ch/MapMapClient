import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IAdvancedFilter } from '../pipes/i-advanced-filter';

@Injectable({
  providedIn: 'root'
})
export class AdvancedFilterService {
  
  private _url = "./assets/advancedFilter.json";
  public filtersData = [];
  constructor(private http : HttpClient) { }

  getAllFilters(): Observable<IAdvancedFilter[]>{
    return this.http.get<IAdvancedFilter[]>(this._url);
  }
  getData(){
    return this.filtersData;
  }
  setData(filtersData){
    this.filtersData = filtersData; 
  }
}
