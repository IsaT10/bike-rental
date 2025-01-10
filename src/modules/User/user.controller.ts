import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import {
  deleteUserFromDB,
  getAllUserFromDB,
  getProfileFromDB,
  roleChangeUser,
  updateProfileIntoDB,
} from './user.service';

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

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const { result, meta } = await getAllUserFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully',
    meta,
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await deleteUserFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User deleted successfully',
    data,
  });
});

const roleChange = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await roleChangeUser(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Role changed successfully',
    data,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;

  const data = await updateProfileIntoDB(id, req.body, req?.file);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile updated successfully',
    data,
  });
});

export { updateProfile, getProfile, getUsers, deleteUser, roleChange };
