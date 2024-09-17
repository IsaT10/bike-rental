import { Schema, model } from 'mongoose';
import { ICoupon } from './coupon.interface';

const CouponSchema = new Schema<ICoupon>(
  {
    couponCode: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

export const Coupon = model<ICoupon>('Coupon', CouponSchema);
