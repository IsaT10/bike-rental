import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { getProfileFromDB, updateProfileIntoDB } from './user.service';

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const data = await getProfileFromDB(req.user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile retrieved successfully',
    data,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.user;
  const data = await updateProfileIntoDB(email, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile updated successfully',
    data,
  });
});

export { updateProfile, getProfile };
