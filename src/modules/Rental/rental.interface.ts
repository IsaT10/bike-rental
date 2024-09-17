import { Types } from 'mongoose';

export interface TRental {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime: Date | null;
  totalCost: number;
  isReturned: boolean;
  isPaid: boolean;
  advancedPayment: number;
  isRental: boolean;
}
