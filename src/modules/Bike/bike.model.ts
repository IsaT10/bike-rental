import { Schema, model } from 'mongoose';
import { TBike } from './bike.interface';

const BikeSchema = new Schema<TBike>(
  {
    image: { type: String, required: true },
    description: { type: String, required: true, trim: true },
    pricePerHour: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    cc: { type: Number, required: true },
    year: { type: Number, required: true },
    model: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

BikeSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'bikeId',
  localField: '_id',
});

export const Bike = model<TBike>('Bike', BikeSchema);
