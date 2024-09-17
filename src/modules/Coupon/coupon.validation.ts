import { z } from 'zod';

const createCouponValidationSchema = z.object({
  body: z.object({
    couponCode: z.string({ required_error: 'Coupon code is required' }),
    discount: z.number({ required_error: 'Discount is required' }),
    isActive: z.boolean().optional(),
  }),
});

const updateCouponValidationSchema = z.object({
  body: z.object({
    couponCode: z.string().optional(),
    discount: z.number().optional(),
    isActive: z.boolean().optional(),
  }),
});

export { createCouponValidationSchema, updateCouponValidationSchema };
