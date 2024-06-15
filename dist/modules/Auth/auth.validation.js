"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lgoinUserValidationSchema = void 0;
const zod_1 = require("zod");
const lgoinUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: 'Email is required' })
            .email('Invalid user email'),
        password: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(8, 'Password can not be less than 8 character'),
    }),
});
exports.lgoinUserValidationSchema = lgoinUserValidationSchema;
