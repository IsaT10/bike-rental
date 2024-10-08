import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import AppError from '../../error/appError';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { TLogin } from './auth.interface';
import config from '../../config';

const userSignUp = async (payload: Omit<TUser, 'role'>) => {
  //hash normal passwod
  const hashPassword = await User.hashPassword(payload.password);

  payload.password = hashPassword;

  const result = await User.create({ role: 'user', ...payload });

  const userWithoutPassword = await User.findById(result._id)
    .select('-password')
    .lean();

  return userWithoutPassword;
};

const userLogin = async (payload: TLogin) => {
  const isUserExists = await User.findOne({ email: payload.email }).select(
    '+password -__v -updatedAt -createdAt '
  );

  // check is user exists
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const { password, ...user } = isUserExists.toObject();

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
  const accessToken = jwt.sign(jwtPayload, config.access_secret as string, {
    expiresIn: config.access_expires,
  });

  return { user, accessToken };
};

export { userSignUp, userLogin };
