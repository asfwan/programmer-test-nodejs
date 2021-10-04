export interface BaseItem {
  name: string;
  rolename: string;
  movie_id: number;
}

export interface Cast extends BaseItem {
  id: number;
}
