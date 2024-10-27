"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidationSchema = exports.createUserValidationSchema = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        // .regex(/^[A-Z][a-zA-Z\s]*$/, 'Name must start with a capital letter.')
        email: zod_1.z
            .string({ required_error: 'Email is required' })
            .email('Provide a valid email.'),
        password: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(8, 'Password can not be less than 8 character'),
        role: zod_1.z.string({ required_error: 'Role is required' }).optional(),
    }),
});
exports.createUserValidationSchema = createUserValidationSchema;
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ required_error: 'Name is required' })
            .regex(/^[A-Z][a-zA-Z\s]*$/, 'Name must start with a capital letter.')
            .optional(),
        email: zod_1.z
            .string({ required_error: 'Email is required' })
            .email('Provide a valid email.')
            .optional(),
        password: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(8, 'Password can not be less than 8 character')
            .optional(),
        address: zod_1.z.string({ required_error: 'Address is required' }).optional(),
        phone: zod_1.z.string({ required_error: 'Phone number is required' }).optional(),
        role: zod_1.z.string({ required_error: 'Role is required' }).optional(),
    }),
});
exports.updateUserValidationSchema = updateUserValidationSchema;
