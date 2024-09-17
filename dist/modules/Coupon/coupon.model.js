"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = void 0;
const mongoose_1 = require("mongoose");
const CouponSchema = new mongoose_1.Schema({
    couponCode: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true, versionKey: false });
exports.Coupon = (0, mongoose_1.model)('Coupon', CouponSchema);
