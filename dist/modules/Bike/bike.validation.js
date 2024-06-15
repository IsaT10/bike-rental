"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBikeValidationSchema = exports.createBikeValidationSchema = void 0;
const zod_1 = require("zod");
const createBikeValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Bike name is required' }),
        description: zod_1.z.string({ required_error: 'Description is required' }),
        pricePerHour: zod_1.z.number({ required_error: 'Price per hour is required' }),
        cc: zod_1.z.number({ required_error: 'Cc is required' }),
        year: zod_1.z.number({ required_error: 'Release year is required' }),
        model: zod_1.z.string({ required_error: 'Bike model is required' }),
        brand: zod_1.z.string({ required_error: 'Bike brand is required' }),
    }),
});
exports.createBikeValidationSchema = createBikeValidationSchema;
const updateBikeValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        pricePerHour: zod_1.z.number().optional(),
        cc: zod_1.z.number().optional(),
        year: zod_1.z.number().optional(),
        model: zod_1.z.string().optional(),
        brand: zod_1.z.string().optional(),
    }),
});
exports.updateBikeValidationSchema = updateBikeValidationSchema;
