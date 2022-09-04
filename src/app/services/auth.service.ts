import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

import { Register } from '../interfaces/register';
import { Login } from '../interfaces/login';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = 'https://route-egypt-api.herokuapp.com/';
  userData = new BehaviorSubject(null);
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('token')) this.getUserData();
  }
  register(formData: Register): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}signup`, formData);
  }
  login(formData: Login): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}signin`, formData);
  }
  logOut() {
    localStorage.clear();
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }

  getUserData() {
    this.userData.next(
      jwtDecode(JSON.stringify(localStorage.getItem('token')))
    );
    return this.userData.getValue();
  }
}
