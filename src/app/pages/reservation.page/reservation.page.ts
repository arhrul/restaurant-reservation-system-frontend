import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatInput, MatLabel, MatSuffix} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {MatTimepicker, MatTimepickerInput, MatTimepickerToggle} from "@angular/material/timepicker";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TableFilters} from '../../core/dtos/TableFilters.dto';
import {TableService} from '../../core/services/table.service';
import {Preference, PreferencesLabels} from '../../core/enums/preferences.enum';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {Table} from '../../core/dtos/Table.dto';
import {ReservationService} from '../../core/services/reservation.service';
import {ReservationCreateDto} from '../../core/dtos/ReservationCreate.dto';

@Component({
  selector: 'app-reservation.page',
  imports: [
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    MatTimepicker,
    MatTimepickerInput,
    MatTimepickerToggle,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './reservation.page.html',
  styleUrl: './reservation.page.css',
})
export class ReservationPage implements OnInit {

  form!: FormGroup;

  filteredTables$: Observable<Table[]> | undefined;

  selectedTable: Table | null = null;

  reservationSuccess = false;

  preferenceList = (Object.values(Preference) as Preference[])
    .filter(v => typeof v === "number")
    .map(pref => ({
      value: pref,
      label: PreferencesLabels[pref]
    }));

  constructor(
    private fb: FormBuilder,
    private tableService: TableService,
    private reservationService: ReservationService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date: ['', Validators.required],
      time: ['', Validators.required],
      numberOfPeople: ['', Validators.required],
      preferences: [[]],
    });
  }

  onFilter() {

    const formValues = this.form.value;

    const date: Date = formValues.date;
    const time: Date = formValues.time;

    const startTime = new Date(date);

    startTime.setHours(time.getHours());
    startTime.setMinutes(time.getMinutes());
    startTime.setSeconds(0);

    const filters: TableFilters = {
      startTime: startTime.toISOString().slice(0, 19),
      numberOfGuests: formValues.numberOfPeople,
      preferences: formValues.preferences
    };

    this.filteredTables$ = this.tableService.getFilteredTables(filters);

    this.selectedTable = null;
  }

  hasAdvisedTables(tables: Table[]): boolean {
    return tables.some(t => t.advised);
  }

  selectTable(table: Table) {
    if (!table.advised) return;

    this.selectedTable = table;
  }

  submitReservation() {
    if (!this.selectedTable) return;

    const formValues = this.form.getRawValue();
    const startTime = new Date(formValues.date);
    startTime.setHours(formValues.time.getHours());
    startTime.setMinutes(formValues.time.getMinutes());
    startTime.setSeconds(0);

    const reservation: ReservationCreateDto = {
      firstname: formValues.firstname,
      lastname: formValues.lastname,
      email: formValues.email,
      tableId: this.selectedTable.id,
      numberOfGuests: formValues.numberOfPeople,
      startTime: startTime.toISOString().slice(0,19),
      prefWindow: formValues.preferences.includes(0),
      prefPrivate: formValues.preferences.includes(1),
      prefAccessible: formValues.preferences.includes(2)
    };

    this.reservationService.createReservation(reservation).subscribe();
    this.reservationSuccess = true;
  }

}
