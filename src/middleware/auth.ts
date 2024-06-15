import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import AppError from '../error/appError';
import httpStatus from 'http-status';
import config from '../config';
import { User } from '../modules/User/user.model';

export const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization?.split(' ')[1];

    //check is access token provide
    if (!accessToken) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route'
      );
    }

    //decoded token and get payload data from token
    const decoded = jwt.verify(
      accessToken as string,
      config.access_secret as string
    ) as JwtPayload;

    const { id, role } = decoded;

    //check is user valid
    const user = await User.isValidUser(id);

    //check have role based access
    if (!requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route'
      );
    }

    if (user.role !== role) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You do not have permission to perform this action'
      );
    }

    req.user = decoded;

    next();
  });
};
