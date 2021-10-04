export interface BaseItem {
  title: string;
  director: string;
  description: string;
  duration_min: number;
}

export interface Movie extends BaseItem {
  movie_id: number;
}
