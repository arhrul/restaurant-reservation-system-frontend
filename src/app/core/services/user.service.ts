import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {environment} from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private api: ApiService) {}

  public getUsers() {
    return this.api.get<any>(`${environment.apiUrl}/users`);
  }
}
