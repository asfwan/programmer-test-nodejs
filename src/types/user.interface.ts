export interface BaseItem {
  name: string;
  email: string;
  password?: string;
}

export interface User extends BaseItem {
  user_id: number;
}
