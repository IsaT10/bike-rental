import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import {
  createCouponIntoDB,
  deleteCouponFromDB,
  getAllCouponsFromDB,
  getSingleCouponFromDB,
  updateCouponIntoDB,
} from './coupon.service';

const createCoupon = catchAsync(async (req: Request, res: Response) => {
  const data = await createCouponIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Coupon created successfully',
    data,
  });
});

const getAllCoupons = catchAsync(async (req: Request, res: Response) => {
  const data = await getAllCouponsFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Coupons retrieved successfully',
    data,
  });
});

const getSingleCoupon = catchAsync(async (req: Request, res: Response) => {
  const { code } = req.params;
  const data = await getSingleCouponFromDB(code);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Coupon retrieved successfully',
    data,
  });
});

const updateCoupon = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await updateCouponIntoDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Coupon updated successfully',
    data,
  });
});

const deleteCoupon = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await deleteCouponFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Coupon deleted successfully',
    data,
  });
});

export {
  createCoupon,
  getAllCoupons,
  getSingleCoupon,
  updateCoupon,
  deleteCoupon,
};
