import { z } from 'zod';

const createBikeValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Bike name is required' }),
    description: z.string({ required_error: 'Description is required' }),
    pricePerHour: z.number({ required_error: 'Price per hour is required' }),
    cc: z.number({ required_error: 'Cc is required' }),
    year: z.number({ required_error: 'Release year is required' }),
    model: z.string({ required_error: 'Bike model is required' }),
    brand: z.string({ required_error: 'Bike brand is required' }),
  }),
});

export { createBikeValidationSchema };
