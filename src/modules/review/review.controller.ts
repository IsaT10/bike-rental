import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import {
  createReviewIntoDB,
  getReviewByIdFromDB,
  updateReviewInDB,
  deleteReviewFromDB,
  getAllReviewByUserFromDB,
  getAllReviewByAdminFromDB,
} from './review.service';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  const { bikeId, rentId } = req.params;
  const data = await createReviewIntoDB(id, rentId, bikeId, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Review created successfully',
    data,
  });
});

const getReviewById = catchAsync(async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const data = await getReviewByIdFromDB(reviewId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review retrieved successfully',
    data,
  });
});
const getAllReviewByUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  const { result, meta } = await getAllReviewByUserFromDB(req.query, id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Reviews retrieved successfully',
    meta,
    data: result,
  });
});
const getAllReviewByAdmin = catchAsync(async (req: Request, res: Response) => {
  const { result, meta } = await getAllReviewByAdminFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Reviews retrieved successfully',
    meta,
    data: result,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const { reviewId } = req.params;

  const data = await updateReviewInDB(reviewId, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review updated successfully',
    data,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  await deleteReviewFromDB(reviewId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review deleted successfully',
    data: null,
  });
});

export {
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
  getAllReviewByUser,
  getAllReviewByAdmin,
};
