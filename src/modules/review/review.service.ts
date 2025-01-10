import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/appError';
import { Rental } from '../Rental/rental.model';
import { TReview } from './review.interface';
import { Review } from './review.model';
import httpStatus from 'http-status';

const createReviewIntoDB = async (
  userId: string,
  rentId: string,

  bikeId: string,
  payload: TReview
) => {
  const result = await Review.create({ ...payload, userId, bikeId });

  await Rental.findByIdAndUpdate(
    rentId,
    { isReviewed: true },
    {
      new: true,
    }
  );

  return result;
};

const getReviewByIdFromDB = async (reviewId: string) => {
  const result = await Review.findById(reviewId).populate('userId', 'name');
  // .populate('bikeId', 'brand');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Review not found!');
  }
  return result;
};

const getAllReviewByUserFromDB = async (
  query: Record<string, unknown>,
  id: string
) => {
  const reviewQuery = new QueryBuilder(
    Review.find({ userId: id })
      .populate('userId', 'name email')
      .populate('bikeId', 'image brand model'),
    query
  )
    .search([])
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await reviewQuery.queryModel;
  const meta = await reviewQuery.countTotal();

  return { result, meta };
};
const getAllReviewByAdminFromDB = async (query: Record<string, unknown>) => {
  const reviewQuery = new QueryBuilder(
    Review.find()
      .populate('userId', 'name email')
      .populate('bikeId', 'image brand model'),
    query
  )
    .search([])
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await reviewQuery.queryModel;
  const meta = await reviewQuery.countTotal();
  // const result = await Review.find()
  //   .populate('userId', 'name email')
  //   .populate('bikeId', 'image brand model');

  return { result, meta };
};

const updateReviewInDB = async (reviewId: string, payload: TReview) => {
  const review = await Review.findByIdAndUpdate(reviewId, payload, {
    new: true,
  });
  if (!review) {
    throw new AppError(httpStatus.NOT_FOUND, 'Review not found!');
  }

  return review.save();
};

const deleteReviewFromDB = async (reviewId: string) => {
  const result = await Review.findByIdAndDelete(reviewId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Review not found!');
  }
  return result;
};

export {
  createReviewIntoDB,
  getReviewByIdFromDB,
  getAllReviewByUserFromDB,
  getAllReviewByAdminFromDB,
  updateReviewInDB,
  deleteReviewFromDB,
};
