import { Schema, model } from 'mongoose';
import { TRental } from './rental.interface';

const RentalSchema = new Schema<TRental>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bikeId: {
      type: Schema.Types.ObjectId,
      ref: 'Bike',
      required: true,
    },
    startTime: { type: Date, default: new Date() },
    returnTime: { type: Date, default: null },
    totalCost: { type: Number, default: 0 },
    isReturned: { type: Boolean, default: false },
  },
  { versionKey: false }
);

export const Rental = model<TRental>('Rental', RentalSchema);
