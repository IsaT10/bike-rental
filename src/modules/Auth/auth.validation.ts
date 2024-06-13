import { z } from 'zod';

const lgoinUserValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid user email'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password can not be less than 8 character'),
  }),
});

export { lgoinUserValidationSchema };
