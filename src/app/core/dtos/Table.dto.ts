export interface Table {
  id: number;
  x: number;
  y: number;
  capacity: number;

  window: boolean;
  private: boolean;
  accessible: boolean;

  advised: boolean;
  available: boolean;
}
