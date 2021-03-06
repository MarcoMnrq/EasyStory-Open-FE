// user.service.ts
// Users Resource API Middleware

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'https://easystory-api.herokuapp.com/api/users';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(API_URL);
  }
}
