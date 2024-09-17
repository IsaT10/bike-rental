"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError_1 = __importDefault(require("../error/handleZodError"));
const handleValidationError_1 = __importDefault(require("../error/handleValidationError"));
const handelCastError_1 = __importDefault(require("../error/handelCastError"));
const handleDuplicate_1 = __importDefault(require("../error/handleDuplicate"));
const http_status_1 = __importDefault(require("http-status"));
const handleExpiredTokenError_1 = __importDefault(require("../error/handleExpiredTokenError"));
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    let error = Object.assign({}, err);
    error.message = err.message;
    if ((err === null || err === void 0 ? void 0 : err.name) === 'ZodError') {
        error = (0, handleZodError_1.default)(error);
    }
    if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        error = (0, handleValidationError_1.default)(error);
    }
    if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        error = (0, handleDuplicate_1.default)(error);
    }
    if (err.name === 'CastError') {
        error = (0, handelCastError_1.default)(error);
    }
    if ((err === null || err === void 0 ? void 0 : err.name) === 'TokenExpiredError') {
        error = (0, handleExpiredTokenError_1.default)();
    }
    const { statusCode, message, stack } = error;
    const response = {
        success: false,
        statusCode,
        message,
        stack,
    };
    if (statusCode === http_status_1.default.NOT_FOUND) {
        response.data = [];
    }
    res.status(statusCode).json(response);
};
exports.default = globalErrorHandler;
// import { ErrorRequestHandler } from 'express';
// import httpStatus from 'http-status';
// import { ZodError } from 'zod';
// import handleZodError from '../error/handleZodError';
// import handleValidationError from '../error/handleValidationError';
// import handleCastError from '../error/handelCastError';
// import handleDuplicate from '../error/handleDuplicate';
// export type TErrorSource = {
//   path: string | number;
//   message: string;
// }[];
// export type TGenericErrorResponse = {
//   statusCode: number;
//   message: string;
//   errorMessages: TErrorSource;
// };
// type TResponse = {
//   success: boolean;
//   statusCode?: number;
//   message: string;
//   errorMessages?: TErrorSource;
//   stack?: string;
//   data?: [];
// };
// const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
//   let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
//   let message = err.message || 'Internal Server Error';
//   let errorMessages: TErrorSource = [
//     {
//       path: '',
//       message: 'Something went wrong',
//     },
//   ];
//   if (err instanceof ZodError) {
//     const simplifiedError = handleZodError(err);
//     statusCode = simplifiedError.statusCode;
//     message = simplifiedError.message;
//     errorMessages = simplifiedError.errorMessages;
//   } else if (err?.name === 'ValidationError') {
//     const simplifiedError = handleValidationError(err);
//     statusCode = simplifiedError.statusCode;
//     message = simplifiedError.message;
//     errorMessages = simplifiedError.errorMessages;
//   } else if (err?.name === 'CastError') {
//     const simplifiedError = handleCastError(err);
//     statusCode = simplifiedError.statusCode;
//     message = simplifiedError.message;
//     errorMessages = simplifiedError.errorMessages;
//   } else if (err?.code === 11000) {
//     const simplifiedError = handleDuplicate(err);
//     statusCode = simplifiedError.statusCode;
//     message = simplifiedError.message;
//     errorMessages = simplifiedError.errorMessages;
//   }
//   const response: TResponse = {
//     success: false,
//     message,
//   };
//   if (statusCode === httpStatus.NOT_FOUND) {
//     response.data = [];
//   }
//   if (statusCode === httpStatus.UNAUTHORIZED) {
//     response.statusCode = statusCode;
//   }
//   if (
//     statusCode !== httpStatus.UNAUTHORIZED &&
//     statusCode !== httpStatus.NOT_FOUND
//   ) {
//     response.errorMessages = errorMessages;
//     response.stack = err.stack;
//   }
//   res.status(statusCode).json(response);
// };
// export default globalErrorHandler;
