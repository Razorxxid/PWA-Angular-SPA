import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:5078/api/Authetication';
const API_URL = 'http://localhost:5078/api/';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  

  hello(): Observable<any> {
    return this.http.post(
      API_URL 
      + 'Announcement',
      httpOptions
    );
  }


  login(username: string, password: string): Observable<any> {

    let Email=username;
    let Password=password;

    
    return this.http.post(
      AUTH_API ,
      {
        Email,
        Password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }
}