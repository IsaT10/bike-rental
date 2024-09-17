"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("./appError"));
const handleValidationError = (err) => {
    let message = '';
    Object.values(err.errors).map((val) => {
        message = `${val === null || val === void 0 ? void 0 : val.path.toUpperCase()} is required`;
    });
    return new appError_1.default(http_status_1.default.BAD_REQUEST, message);
};
exports.default = handleValidationError;
// import mongoose from 'mongoose';
// import {
//   TErrorSource,
//   TGenericErrorResponse,
// } from '../middleware/globalErrorHandler';
// const handleValidationError = (
//   err: mongoose.Error.ValidationError
// ): TGenericErrorResponse => {
//   const errorMessages: TErrorSource = Object.values(err.errors).map(
//     (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
//       return {
//         path: val?.path,
//         message: val?.message,
//       };
//     }
//   );
//   return {
//     statusCode: 400,
//     message: 'Validation Error',
//     errorMessages,
//   };
// };
// export default handleValidationError;
