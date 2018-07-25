import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApartmentsService {

  // can delete this file
  constructor(private http : HttpClient) { }

}
