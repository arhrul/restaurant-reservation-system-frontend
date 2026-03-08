import { Routes } from '@angular/router';
import {AdminPage} from './pages/admin.page/admin.page';
import {ReservationPage} from './pages/reservation.page/reservation.page';

export const routes: Routes = [
  { path: '', component: ReservationPage },
  { path: 'admin', component: AdminPage },
];
