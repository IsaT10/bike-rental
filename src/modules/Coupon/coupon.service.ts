import { ICoupon } from './coupon.interface';
import { Coupon } from './coupon.model';
import AppError from '../../error/appError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';

const createCouponIntoDB = async (payload: ICoupon) => {
  const result = await Coupon.create(payload);
  return result;
};

const getAllCouponsFromDB = async (query: Record<string, unknown>) => {
  const couponQuery = new QueryBuilder(Coupon.find(), query)
    .search([])
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await couponQuery.queryModel;
  return result;
};

const getSingleCouponFromDB = async (code: string) => {
  const result = await Coupon.findOne({ couponCode: code });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Coupon not found');
  }
  return result;
};

const updateCouponIntoDB = async (id: string, payload: Partial<ICoupon>) => {
  const result = await Coupon.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Coupon not found');
  }
  return result;
};

const deleteCouponFromDB = async (id: string) => {
  const result = await Coupon.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Coupon not found');
  }
  return result;
};

export {
  createCouponIntoDB,
  getAllCouponsFromDB,
  getSingleCouponFromDB,
  updateCouponIntoDB,
  deleteCouponFromDB,
};
