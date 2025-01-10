import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import {
  cancleRentFromDB,
  changePaymentStatusFromDB,
  createRentalIntoDB,
  getAllRentalFromDB,
  getRentalFromDB,
  updateRentalIntoDB,
} from './rental.service';

const createRental = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;

  const data = await createRentalIntoDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rental created successfully',
    data,
  });
});

const upadteRental = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await updateRentalIntoDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike returned successfully',
    data,
  });
});

const getRentals = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;

  const { result, meta } = await getRentalFromDB(id, req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rentals retrieved successfully',
    meta,
    data: result,
  });
});

const getAllRentals = catchAsync(async (req: Request, res: Response) => {
  const { result, meta } = await getAllRentalFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rentals retrieved successfully',
    meta,
    data: result,
  });
});

const changePaymentStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await changePaymentStatusFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Payment complete!',
    data,
  });
});
const cancleRent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await cancleRentFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cancle rent!',
    data,
  });
});

export {
  createRental,
  upadteRental,
  getRentals,
  getAllRentals,
  changePaymentStatus,
  cancleRent,
};
