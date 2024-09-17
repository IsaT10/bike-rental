"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("./appError"));
const handelZodError = (err) => {
    let message = '';
    err.issues.map((issue) => {
        message = issue.message;
    });
    return new appError_1.default(http_status_1.default.BAD_REQUEST, message);
};
exports.default = handelZodError;
// import { ZodError, ZodIssue } from 'zod';
// import {
//   TErrorSource,
//   TGenericErrorResponse,
// } from '../middleware/globalErrorHandler';
// const handleZodError = (err: ZodError): TGenericErrorResponse => {
//   const errorMessages: TErrorSource = err.issues.map((issue: ZodIssue) => {
//     return {
//       path: issue?.path[issue.path.length - 1],
//       message: issue?.message,
//     };
//   });
//   const statusCode = 400;
//   return {
//     statusCode,
//     message: 'Validation Error',
//     errorMessages,
//   };
// };
// export default handleZodError;
