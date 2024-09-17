"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCouponValidationSchema = exports.createCouponValidationSchema = void 0;
const zod_1 = require("zod");
const createCouponValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        couponCode: zod_1.z.string({ required_error: 'Coupon code is required' }),
        discount: zod_1.z.number({ required_error: 'Discount is required' }),
        isActive: zod_1.z.boolean().optional(),
    }),
});
exports.createCouponValidationSchema = createCouponValidationSchema;
const updateCouponValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        couponCode: zod_1.z.string().optional(),
        discount: zod_1.z.number().optional(),
        isActive: zod_1.z.boolean().optional(),
    }),
});
exports.updateCouponValidationSchema = updateCouponValidationSchema;
