import {Component, OnInit} from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {Observable} from 'rxjs';
import {TableService} from '../../core/services/table.service';
import {AsyncPipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {ReservationService} from '../../core/services/reservation.service';
import {UserService} from '../../core/services/user.service';

@Component({
  selector: 'app-admin.page',
  imports: [
    MatTabGroup,
    MatTab,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    AsyncPipe,
    MatIcon
  ],
  templateUrl: './admin.page.html',
  styleUrl: './admin.page.css',
})
export class AdminPage implements OnInit {

  tableColumns: string[] = ['id', 'capacity', 'coordinates', 'isWindow', 'isPrivate', 'isAccessible'];
  reservationColumns: string[] = ['id', 'userId', 'tableId', 'startTime', 'endTime', 'guestCount', 'prefWindow', 'prefPrivate', 'prefAccessible'];
  userColumns: string[] = ['id', 'name', 'email'];

  tables$: Observable<any> | undefined;
  reservations$: Observable<any> | undefined;
  users$: Observable<any> | undefined;

  constructor(private tableService: TableService, private reservationService: ReservationService, private userService: UserService) { }

  ngOnInit(): void {
    this.tables$ = this.tableService.getTables()
    this.reservations$ = this.reservationService.getReservations()
    this.users$ = this.userService.getUsers()
  }
}
