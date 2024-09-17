import { ZodError, ZodIssue } from 'zod';
import httpStatus from 'http-status';
import AppError from './appError';

const handelZodError = (err: ZodError) => {
  let message: string = '';

  err.issues.map((issue: ZodIssue) => {
    message = issue.message;
  });

  return new AppError(httpStatus.BAD_REQUEST, message);
};

export default handelZodError;

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
