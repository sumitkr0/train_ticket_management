import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/user/login'; 

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    // Send a POST request to the backend with the username and password
    return this.http.post<any>(this.apiUrl, { username, password });
  }
}
