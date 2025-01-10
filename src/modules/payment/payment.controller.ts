import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import {
  getPaymentFromDB,
  paymentIntoDB,
  paymentWithStripe,
  saveTransactionIntoDB,
} from './payment.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const stripePayment = catchAsync(async (req: Request, res: Response) => {
  const data = await paymentWithStripe(req.body);

  res.json({
    success: true,
    statusCode: 201,
    clientSecret: data,
  });
});
// const stripePaymentSession = catchAsync(async (req: Request, res: Response) => {
//   const data = await paymentWithStripeSession(req.body);

//   res.json({
//     success: true,
//     statusCode: 201,
//     data,
//   });
// });

// export const stripeWebhook = async (req: Request, res: Response) => {
//   const sig = req.headers['stripe-signature'];

//   try {
//     const event = stripe.webhooks.constructEvent(
//       req.body,
//       sig as string,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     );

//     if (event.type === 'checkout.session.completed') {
//       const session = event.data.object as Stripe.Checkout.Session;

//       // Extract transaction details
//       // const transactionId = session.payment_intent;
//       // const amount = session.amount_total;
//       // const bikeId = session.metadata?.bikeId;
//       // const userId = session.metadata?.userId;

//       // Save these details to your database
//       // Example:
//       console.log(session);

//       console.log('Payment successfully processed and stored');
//     }

//     res.json({ received: true });
//   } catch (error) {
//     console.error('Webhook error:', error);
//     res.status(400).send(`Webhook Error: ${error.message}`);
//   }
// };

const saveTransaction = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;

  console.log(req.body);
  const data = await saveTransactionIntoDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Payment successful',
    data,
  });
});
const payment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  const data = await paymentIntoDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Payment successful',
    data,
  });
});

const getAllPayment = catchAsync(async (req: Request, res: Response) => {
  const { id, role } = req.user;
  const { result, meta } = await getPaymentFromDB(req.query, id, role);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Payment history retrived successfully',
    meta,
    data: result,
  });
});

export {
  payment,
  getAllPayment,
  stripePayment,
  saveTransaction,
  // stripePaymentSession,
};
