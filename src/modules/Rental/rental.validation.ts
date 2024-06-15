import { z } from 'zod';

const createRentalValidationSchema = z.object({
  body: z.object({
    bikeId: z.string({ required_error: 'Bike id is required' }),

    startTime: z.string().optional(),
  }),
});

export { createRentalValidationSchema };
