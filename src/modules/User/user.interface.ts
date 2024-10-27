/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TUser {
  name: string;
  password: string;
  email: string;
  image: string;
  phone: string;
  address: string;
  role: 'admin' | 'user';
}

export interface UserModel extends Model<TUser> {
  hashPassword: (plainPassword: string) => Promise<string>;
  isValidUser: (id: string) => Promise<TUser>;
  isPasswordMatched: (
    plainPassword: string,
    hashPassword: string
  ) => Promise<boolean>;
}
