import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {TableFilters} from '../dtos/TableFilters.dto';
import {environment} from '../../../environments/environment.development';
import {Table} from '../dtos/Table.dto';

@Injectable({
  providedIn: 'root',
})
export class TableService {

  constructor(private api: ApiService) {}

  public getFilteredTables(filters: TableFilters) {
    return this.api.get<Table[]>(`${environment.apiUrl}/tables/filtered`, filters);
  }

  public getTables() {
    return this.api.get<any>(`${environment.apiUrl}/tables`);
  }
}
