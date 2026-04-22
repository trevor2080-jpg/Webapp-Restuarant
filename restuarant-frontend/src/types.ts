export interface Restaurant {
  id: number;
  name: string;
  location: string;
  active: boolean;
}

export interface CreateRestaurantDto {
  name: string;
  location: string;
  active: boolean;
}

export interface UpdateRestaurantDto {
  name?: string;
  location?: string;
  active?: boolean;
}