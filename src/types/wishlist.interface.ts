export interface BaseItem {
  movie_id: number;
  user_id: number;
}

export interface Wishlist extends BaseItem {
  wishlist_id: number;
}
