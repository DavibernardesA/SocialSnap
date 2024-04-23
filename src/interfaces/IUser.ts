export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
  followers: number;
  following: number;
  publications: number;
  bio: string;
}
