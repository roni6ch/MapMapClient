import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import {HttpRequestsService} from '../services/http-requests.service';

@Injectable()
export class AuthService {

  constructor(private httpReq : HttpRequestsService,private http: HttpClient,
              private _router: Router) { }

  logoutUser() {
    localStorage.removeItem('token');
  }

  setToken(token) {
    this.httpReq.token.next(token);
    return localStorage.setItem('token',token);
  }
  
  getToken() {
    return localStorage.getItem('token')
  }


  loggedIn() {
    return !!localStorage.getItem('token')    
  }
}