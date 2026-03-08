import { Preference } from "../enums/preferences.enum";

export interface TableFilters {
  startTime: Date,
  numberOfGuests: number,
  preferences: Preference[],
}
