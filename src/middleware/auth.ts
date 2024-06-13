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

    if (!accessToken) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized to access this route'
      );
    }

    const decoded = jwt.verify(
      accessToken as string,
      config.access_secret as string
    ) as JwtPayload;

    const { role, email } = decoded;

    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    if (!requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You do not have permission to perform this action'
      );
    }

    if (user.role !== role) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You do not have permissiooooon to perform this action'
      );
    }

    req.user = decoded;

    next();
  });
};
