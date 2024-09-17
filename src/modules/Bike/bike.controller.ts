import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import {
  createBikeIntoDB,
  deleteBikeFromDB,
  getAllBikeFromDB,
  getSingleBikeFromDB,
  updateBikeIntoDB,
} from './bike.service';

const createBike = catchAsync(async (req: Request, res: Response) => {
  const data = await createBikeIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike added successfully',
    data,
  });
});

const getAllBike = catchAsync(async (req: Request, res: Response) => {
  const data = await getAllBikeFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bikes retrived successfully',
    data,
  });
});

const getSingleBike = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await getSingleBikeFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike retrived successfully',
    data,
  });
});

const updateBike = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await updateBikeIntoDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike updated successfully',
    data,
  });
});

const deleteBike = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await deleteBikeFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike deleted successfully',
    data,
  });
});

export { createBike, getAllBike, updateBike, deleteBike, getSingleBike };
