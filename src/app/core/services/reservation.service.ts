import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {environment} from '../../../environments/environment.development';
import {ReservationCreateDto} from '../dtos/ReservationCreate.dto';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {

  constructor(private api: ApiService) {}

  public getReservations() {
    return this.api.get<any>(`${environment.apiUrl}/reservations`);
  }

  public createReservation(reservation: ReservationCreateDto) {
    return this.api.post<void>(`${environment.apiUrl}/reservations`, reservation);
  }
}
