import { Types } from 'mongoose';

export interface TPayment {
  transactionId: string;
  user: Types.ObjectId;
  bike: Types.ObjectId;
  amount: number;
  status: string;
}
