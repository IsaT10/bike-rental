"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("./appError"));
const handleCastError = (err) => {
    const message = `Invalid ${err.path}:${err.value}`;
    return new appError_1.default(http_status_1.default.BAD_REQUEST, message);
};
exports.default = handleCastError;
// import mongoose from 'mongoose';
// import {
//   TErrorSource,
//   TGenericErrorResponse,
// } from '../middleware/globalErrorHandler';
// const handleCastError = (
//   err: mongoose.Error.CastError
// ): TGenericErrorResponse => {
//   const errorMessages: TErrorSource = [
//     {
//       path: err.path,
//       message: err.message,
//     },
//   ];
//   return {
//     statusCode: 400,
//     message: 'Invalid Id',
//     errorMessages,
//   };
// };
// export default handleCastError;
