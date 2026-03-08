import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) {}

  get<T>(url: string, params?: any) {
    return this.http.get<T>(url, { params });
  }

  post<T>(url: string, body: any) {
    return this.http.post<T>(url, body);
  }

}
