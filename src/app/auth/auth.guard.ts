import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() { }

  canActivate(): boolean {
    if (!!localStorage.getItem('token')) {
      console.log('true')
      return true
    } else {
      console.log('false')
      return false
    }
  }
}