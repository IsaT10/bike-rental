import { z } from 'zod';

const createReviewValidationSchema = z.object({
  body: z.object({
    review: z.string({ required_error: 'Review is required' }).trim(),
    rating: z.number({ required_error: 'Rating is required' }),
  }),
});

const updateReviewValidationSchema = z.object({
  body: z.object({
    comment: z.string().trim().optional(),
    rating: z.number().optional(),
  }),
});

export { createReviewValidationSchema, updateReviewValidationSchema };
