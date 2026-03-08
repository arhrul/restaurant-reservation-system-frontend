export interface ReservationCreateDto {
  firstname: string;
  lastname: string;
  email: string;
  tableId: number;
  startTime: string;
  numberOfGuests: number;
  prefWindow: boolean;
  prefPrivate: boolean;
  prefAccessible: boolean;
}
