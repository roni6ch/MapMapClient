import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IApartments } from '../iapartments';

@Injectable({
  providedIn: 'root'
})
export class ApartmentsService {

  // can delete this file
  constructor(private http : HttpClient) { }

}
