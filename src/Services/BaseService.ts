import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private readonly baseUrl = 'https://localhost:7108';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private readonly http: HttpClient) {
    this.getToken()
   }

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${path}`,{headers :this.headers});
  }

  post<T>(path: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${path}`, data,{ headers: this.headers });
  }

  
  getToken(){
    const token = localStorage.getItem('token');
    if (token) {
      this.headers = this.headers.set('Authorization', 'Bearer ' + token);
    }
  }
}