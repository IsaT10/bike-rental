import { Schema, model } from 'mongoose';
import { TPayment } from './payment.interface';

const PaymentSchema = new Schema<TPayment>(
  {
    transactionId: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bike: { type: Schema.Types.ObjectId, ref: 'Bike', required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = model<TPayment>('Payment', PaymentSchema);
