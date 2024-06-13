import { Model } from 'mongoose';

export interface TUser {
  name: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

export interface UserModel extends Model<TUser> {
  hashPassword: (plainPassword: string) => Promise<string>;
  isPasswordMatched: (
    plainPassword: string,
    hashPassword: string
  ) => Promise<boolean>;
}
