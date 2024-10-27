/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { TLogin } from './auth.interface';
import config from '../../config';
import { createToken } from './auth.utils';

const userSignUp = async (payload: TUser, file?: any) => {
  const hashPassword = await User.hashPassword(payload.password);

  payload.password = hashPassword;

  const result = await User.create({ ...payload, image: file?.path });

  const jwtPayload = {
    id: result?._id,
    role: result?.role,
  };

  // create access token
  const accessToken = createToken(
    jwtPayload,
    config.access_secret as string,
    config.access_expires as string
  );

  return { accessToken };
};

const userLogin = async (payload: TLogin) => {
  const isUserExists = await User.findOne({ email: payload.email }).select(
    '+password -__v -updatedAt -createdAt '
  );

  // check is user exists
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    isUserExists?.password
  );

  //check is password matched with hash password
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not matched');
  }

  const jwtPayload = {
    id: isUserExists._id,
    role: isUserExists.role,
  };

  // create access token
  const accessToken = createToken(
    jwtPayload,
    config.access_secret as string,
    config.access_expires as string
  );

  return { accessToken };
};

const googleLoginDataInDB = async (payload: Partial<TUser>) => {
  const { email, name, image } = payload;
  if (!email) throw new AppError(httpStatus.BAD_REQUEST, 'Google login failed');

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ email, name, image });
  }

  // Generate JWT
  const jwtPayload = { id: user._id, role: user.role };
  const accessToken = createToken(
    jwtPayload,
    config.access_secret as string,
    config.access_expires as string
  );

  return { accessToken };
};

export { userSignUp, userLogin, googleLoginDataInDB };
