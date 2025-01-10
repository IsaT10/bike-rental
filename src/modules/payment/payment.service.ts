import QueryBuilder from '../../builder/QueryBuilder';
import config from '../../config';
import { TPayment } from './payment.interface';
import { Payment } from './payment.model';
import Stripe from 'stripe';

const stripe = new Stripe(config.stripe_key as string);

const paymentWithStripe = async (payload: { amount: number }) => {
  const { amount } = payload;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(amount || 1 * 100),
    currency: 'usd',
    payment_method_types: ['card'],
  });

  return paymentIntent.client_secret;
};

// const paymentWithStripeSession = async (payload: { amount: number }) => {
//   const { description, amount } = payload;

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     line_items: [
//       {
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: description,
//           },
//           unit_amount: amount * 100, // Amount in cents
//         },
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${process.env.CLIENT_URL}/booking-complete`,
//     cancel_url: `${process.env.CLIENT_URL}/cancel`,
//   });

//   console.log(session);

//   return session.url;
// };

const paymentIntoDB = async (userId: string, payload: TPayment) => {
  const result = await Payment.create({ ...payload, user: userId });
  return result;
};
const saveTransactionIntoDB = async (userId: string, payload: TPayment) => {
  const result = await Payment.create({ ...payload, user: userId });
  return result;
};

const getPaymentFromDB = async (
  query: Record<string, unknown>,
  id: string,
  role: string
) => {
  let queryObj;
  if (role === 'admin') {
    queryObj = {};
  } else {
    queryObj = { user: id };
  }
  const paymentQuery = new QueryBuilder(
    Payment.find(queryObj).populate({
      path: 'user',
      select: 'name email',
    }),
    query
  )
    // .search()
    .fields()
    .sort()
    .filter();

  const result = await paymentQuery.queryModel;
  const meta = await paymentQuery.countTotal();

  return { meta, result };
};

export {
  paymentIntoDB,
  getPaymentFromDB,
  paymentWithStripe,
  saveTransactionIntoDB,
  // paymentWithStripeSession,
};
