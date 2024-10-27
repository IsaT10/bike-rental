import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { googleLoginDataInDB, userLogin, userSignUp } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const signUp = catchAsync(async (req: Request, res: Response) => {
  const { accessToken } = await userSignUp(req.body, req?.file);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: { accessToken },
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { accessToken } = await userLogin(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: { accessToken },
  });
});
const googleLogin = catchAsync(async (req: Request, res: Response) => {
  const { accessToken } = await googleLoginDataInDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: { accessToken },
  });
});

export { signUp, login, googleLogin };
