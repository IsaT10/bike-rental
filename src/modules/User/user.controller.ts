import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { getProfileFromDB, updateProfileIntoDB } from './user.service';

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;

  const data = await getProfileFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile retrieved successfully',
    data,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  const data = await updateProfileIntoDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile updated successfully',
    data,
  });
});

export { updateProfile, getProfile };
