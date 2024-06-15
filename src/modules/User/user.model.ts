import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import AppError from '../../error/appError';
import httpStatus from 'http-status';

const UserSchema = new Schema<TUser, UserModel>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true, select: 0 },
    role: { type: String, enum: ['admin', 'user'], required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.statics.hashPassword = async function (plainPassword: string) {
  const hashPassword = await bcrypt.hash(
    plainPassword,
    Number(process.env.SALT_ROUNDS)
  );

  return hashPassword;
};

UserSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashPassword: string
) {
  return await bcrypt.compare(plainPassword, hashPassword);
};

UserSchema.statics.isValidUser = async function (id: string) {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  return user;
};

export const User = model<TUser, UserModel>('User', UserSchema);
