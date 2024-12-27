import { Schema, model } from 'mongoose';
import { TReview } from './review.interface';

const ReviewSchema = new Schema<TReview>(
  {
    review: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bikeId: { type: Schema.Types.ObjectId, ref: 'Bike', required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const Review = model<TReview>('Review', ReviewSchema);
