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
    image: { type: String },
    password: { type: String, select: 0 },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    address: { type: String },
    phone: { type: String },
  },
  { timestamps: true }
);

// hash normal password
UserSchema.statics.hashPassword = async function (plainPassword: string) {
  const hashPassword = await bcrypt.hash(
    plainPassword,
    Number(process.env.SALT_ROUNDS)
  );

  return hashPassword;
};

UserSchema.pre('save', async function (next) {
  const isUserExist = await User.findOne({ email: this.email });

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, `User already exist.`);
  }

  next();
});

//check password matched
UserSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashPassword: string
) {
  return await bcrypt.compare(plainPassword, hashPassword);
};

//check valid user
UserSchema.statics.isValidUser = async function (id: string) {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  return user;
};

export const User = model<TUser, UserModel>('User', UserSchema);
