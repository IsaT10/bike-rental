import { z } from 'zod';

const paymentValidationSchema = z.object({
  body: z.object({
    amount: z.number({ required_error: 'Amount is required' }),
  }),
});

export { paymentValidationSchema };
