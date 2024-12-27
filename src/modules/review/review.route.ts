import { Router } from 'express';
import {
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
  getAllReview,
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
  '/:bikeId',
  auth('admin', 'user'),
  validateRequest(createReviewValidationSchema),
  createReview
);

// Get a review by ID
router.get('/:reviewId', getReviewById);

// Get all reviews
router.get('/', auth('admin', 'user'), getAllReview);

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
