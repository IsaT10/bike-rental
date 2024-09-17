/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import AppError from './appError';

const handleDuplicateError = (err: any) => {
  const values = Object.values(err.keyValue);
  const message = `'${values.join(' ')}' is already exists. Use another value!`;

  return new AppError(httpStatus.BAD_REQUEST, message);
};

export default handleDuplicateError;

/* eslint-disable @typescript-eslint/no-explicit-any */

// import {
//   TErrorSource,
//   TGenericErrorResponse,
// } from '../middleware/globalErrorHandler';

// // Use Regex
// const handleDuplicate = (err: any): TGenericErrorResponse => {
//   const match = err.message.match(/"([^"]*)"/);
//   const extractedMsg = match && match[1];
//   const errorMessages: TErrorSource = [
//     {
//       path: '',
//       message: `${extractedMsg} already exists. Use another value!`,
//     },
//   ];
//   return {
//     statusCode: 400,
//     message: 'Duplicate Entry',
//     errorMessages,
//   };
// };

// export default handleDuplicate;
