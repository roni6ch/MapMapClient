import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable()
export class AuthService {

  constructor(private http: HttpClient,
              private _router: Router) { }

  logoutUser() {
    localStorage.removeItem('token');
  }

  setToken(token) {
    return localStorage.setItem('token',token);
  }
  
  getToken() {
    return localStorage.getItem('token')
  }


  loggedIn() {
    return !!localStorage.getItem('token')    
  }
}