"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReviewValidationSchema = exports.createReviewValidationSchema = void 0;
const zod_1 = require("zod");
const createReviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        review: zod_1.z.string({ required_error: 'Review is required' }).trim(),
        rating: zod_1.z.number({ required_error: 'Rating is required' }),
    }),
});
exports.createReviewValidationSchema = createReviewValidationSchema;
const updateReviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        comment: zod_1.z.string().trim().optional(),
        rating: zod_1.z.number().optional(),
    }),
});
exports.updateReviewValidationSchema = updateReviewValidationSchema;
