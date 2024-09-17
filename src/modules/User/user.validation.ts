import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    // .regex(/^[A-Z][a-zA-Z\s]*$/, 'Name must start with a capital letter.')

    email: z
      .string({ required_error: 'Email is required' })
      .email('Provide a valid email.'),

    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password can not be less than 8 character'),

    address: z.string({ required_error: 'Address is required' }),
    phone: z.string({ required_error: 'Phone number is required' }),
    role: z.string({ required_error: 'Role is required' }).optional(),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .regex(/^[A-Z][a-zA-Z\s]*$/, 'Name must start with a capital letter.')
      .optional(),

    email: z
      .string({ required_error: 'Email is required' })
      .email('Provide a valid email.')
      .optional(),

    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password can not be less than 8 character')
      .optional(),

    address: z.string({ required_error: 'Address is required' }).optional(),
    phone: z.string({ required_error: 'Phone number is required' }).optional(),
    role: z.string({ required_error: 'Role is required' }).optional(),
  }),
});

export { createUserValidationSchema, updateUserValidationSchema };
