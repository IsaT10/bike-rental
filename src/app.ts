import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { notFoundRoute } from './error/noFoundRoute';
import router from './routes';
import globalErrorHandler from './middleware/globalErrorHandler';
import Stripe from 'stripe';
import config from './config';

const stripe = new Stripe(config.stripe_key as string);

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'http://localhost:5174',
      'http://localhost:5173',
      'https://xrides.netlify.app',
    ],
    credentials: true,
  })
);

// initial server start
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is running' });
});

app.get('/test', (req: Request, res: Response) => {
  res.status(200).json({ message: 'testing...' });
});

// api routes
app.use('/api', router);

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body; // Payment amount in smallest currency unit, e.g., cents for USD

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount || 1 * 100), // Amount in cents
      currency: 'usd', // Specify the currency
      payment_method_types: ['card'],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ message: 'Payment method is not work properly' });
  }
});

// not found route
app.all('*', notFoundRoute);

// handle error globally
app.use(globalErrorHandler);

export default app;
