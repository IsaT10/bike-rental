/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { TBike } from './bike.interface';
import { Bike } from './bike.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createBikeIntoDB = async (payload: TBike, file: any) => {
  if (!file) {
    throw new AppError(httpStatus.NOT_FOUND, 'Image is required');
  }
  const result = await Bike.create({ ...payload, image: file.path });

  return result;
};

const getAllBikeFromDB = async (query: Record<string, unknown>) => {
  const BikeSearchableFields = ['brand', 'model'];

  const bikeQuery = new QueryBuilder(
    Bike.find().populate({
      path: 'reviews',
      select: 'rating',
    }),
    query
  )
    .search(BikeSearchableFields)
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await bikeQuery.queryModel;
  const meta = await bikeQuery.countTotal();

  return { result, meta };
};

const getSingleBikeFromDB = async (id: string) => {
  const result = await Bike.findById(id).populate({
    path: 'reviews',
    populate: { path: 'userId', select: 'name image' },
  });

  return result;
};

const updateBikeIntoDB = async (id: string, payload: Partial<TBike>) => {
  const result = await Bike.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  //checked is updated id is exists
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No data found');
  }

  return result;
};

const deleteBikeFromDB = async (id: string) => {
  const result = await Bike.findByIdAndDelete(id);

  return result;
};

export {
  createBikeIntoDB,
  getAllBikeFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB,
  getSingleBikeFromDB,
};
