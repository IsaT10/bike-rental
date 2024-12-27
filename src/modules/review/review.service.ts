import AppError from '../../error/appError';
import { TReview } from './review.interface';
import { Review } from './review.model';
import httpStatus from 'http-status';

const createReviewIntoDB = async (
  userId: string,
  bikeId: string,
  payload: TReview
) => {
  const result = await Review.create({ ...payload, userId, bikeId });

  return result;
};

const getReviewByIdFromDB = async (reviewId: string) => {
  const result = await Review.findById(reviewId)
    .populate('userId', 'name')
    .populate('bikeId', 'content category');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Review not found!');
  }
  return result;
};

const getAllReviewFromDB = async (id: string) => {
  const result = await Review.find({ userId: id });
  // .populate('userId', 'name')
  // .populate('bikeId', 'content category');

  return result;
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
  getAllReviewFromDB,
  updateReviewInDB,
  deleteReviewFromDB,
};
