import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IApartments } from '../shared/iapartments';

@Injectable({
  providedIn: 'root'
})
export class ApartmentsService {

  apartment : IApartments = null;
  // can delete this file
  constructor(private http : HttpClient) { }

  setApartment(apartment){
    this.apartment = apartment;
  }
  getApartment(){
    return this.apartment;
  }
}
