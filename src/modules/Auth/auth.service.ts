import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import AppError from '../../error/appError';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { TLogin } from './auth.interface';
import config from '../../config';

const userSignUp = async (payload: TUser) => {
  const hashPassword = await User.hashPassword(payload.password);

  payload.password = hashPassword;
  //   payload.role = 'user';

  const result = await User.create(payload);

  const { password, ...userWithoutPassword } = result.toObject();

  return userWithoutPassword;
};

const userLogin = async (payload: TLogin) => {
  const isUserExists = await User.findOne({ email: payload.email }).select(
    '+password -__v -updatedAt -createdAt '
  );

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const { password, ...user } = isUserExists.toObject();

  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    isUserExists?.password
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not matched');
  }

  const jwtPayload = {
    id: isUserExists._id,
    role: isUserExists.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.access_secret as string, {
    expiresIn: config.access_expires,
  });

  return { user, accessToken };
};

export { userSignUp, userLogin };
