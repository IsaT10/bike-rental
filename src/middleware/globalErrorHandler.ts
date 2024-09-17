/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import handelZodError from '../error/handleZodError';
import handleValidationError from '../error/handleValidationError';
import handleCastError from '../error/handelCastError';
import handleDuplicateError from '../error/handleDuplicate';
import httpStatus from 'http-status';
import handleExpiredTokenError from '../error/handleExpiredTokenError';

type TResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  stack?: string;
  data?: [];
};

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  let error = { ...err };
  error.message = err.message;

  if (err?.name === 'ZodError') {
    error = handelZodError(error);
  }

  if (err?.name === 'ValidationError') {
    error = handleValidationError(error);
  }

  if (err?.code === 11000) {
    error = handleDuplicateError(error);
  }

  if (err.name === 'CastError') {
    error = handleCastError(error);
  }

  if (err?.name === 'TokenExpiredError') {
    error = handleExpiredTokenError();
  }

  const { statusCode, message, stack } = error;

  const response: TResponse = {
    success: false,
    statusCode,
    message,
    stack,
  };

  if (statusCode === httpStatus.NOT_FOUND) {
    response.data = [];
  }

  res.status(statusCode).json(response);
};

export default globalErrorHandler;

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
