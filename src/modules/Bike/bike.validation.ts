import { z } from 'zod';

const createBikeValidationSchema = z.object({
  body: z.object({
    description: z.string({ required_error: 'Description is required' }),
    pricePerHour: z.number({ required_error: 'Price per hour is required' }),
    cc: z.number({ required_error: 'Cc is required' }),
    year: z.number({ required_error: 'Release year is required' }),
    bikeWeight: z.number({ required_error: 'Bike weight is required' }),
    highestKmph: z.number({ required_error: 'Highest Kmph is required' }),
    horsepower: z.number({ required_error: 'Horsepower is required' }),
    model: z.string({ required_error: 'Bike model is required' }),
    brand: z.string({ required_error: 'Bike brand izzs required' }),
    tag: z.string({ required_error: 'Bike tag is required' }),
    gear: z.string({ required_error: 'Bike gear is required' }),
  }),
});

const updateBikeValidationSchema = z.object({
  body: z.object({
    description: z.string().optional(),
    pricePerHour: z.number().optional(),
    cc: z.number().optional(),
    year: z.number().optional(),
    highestKmph: z.number().optional(),
    horsepower: z.number().optional(),
    bikeWeight: z.number().optional(),
    model: z.string().optional(),
    brand: z.string().optional(),
    tag: z.string().optional(),
    gear: z.string().optional(),
  }),
});

export { createBikeValidationSchema, updateBikeValidationSchema };
