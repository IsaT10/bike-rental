import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { userLogin, userSignUp } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const signUp = catchAsync(async (req: Request, res: Response) => {
  const data = await userSignUp(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { user, accessToken } = await userLogin(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered successfully',
    token: accessToken,
    data: user,
  });
});

export { signUp, login };
