import { Router } from 'express';
import {
  createReview,
  // getReviewById,
  updateReview,
  deleteReview,
  getAllReviewByUser,
  getAllReviewByAdmin,
} from './review.controller';

import validateRequest from '../../middleware/validateRequest';
import {
  createReviewValidationSchema,
  updateReviewValidationSchema,
} from './review.validation';
import { auth } from '../../middleware/auth';

const router = Router();

// Create a new review
router.post(
  '/:bikeId/:rentId',
  auth('admin', 'user'),
  validateRequest(createReviewValidationSchema),
  createReview
);

// Get a review by ID
// router.get('/:reviewId', getReviewById);

// Get all reviews
router.get('/', auth('user', 'admin'), getAllReviewByUser);
router.get('/all', auth('admin'), getAllReviewByAdmin);

// Update a review by ID
router.patch(
  '/:reviewId',
  auth('admin', 'user'),
  validateRequest(updateReviewValidationSchema),
  updateReview
);

// Delete a review by ID
router.delete('/:reviewId', auth('admin', 'user'), deleteReview);

export default router;
