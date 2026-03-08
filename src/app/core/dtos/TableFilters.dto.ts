import { Preference } from "../enums/preferences.enum";

export interface TableFilters {
  startTime: string,
  numberOfGuests: number,
  preferences: Preference[],
}
