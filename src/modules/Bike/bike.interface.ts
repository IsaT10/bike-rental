import { Model } from 'mongoose';

export interface TBike {
  name: string;
  description: string;
  pricePerHour: number;
  isAvailable: boolean;
  cc: number;
  year: number;
  model: string;
  brand: string;
}

// export interface UserModel extends Model<TUser> {
//   hashPassword: (plainPassword: string) => Promise<string>;
//   isPasswordMatched: (
//     plainPassword: string,
//     hashPassword: string
//   ) => Promise<boolean>;
// }
