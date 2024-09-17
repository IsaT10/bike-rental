import httpStatus from 'http-status';
import AppError from './appError';
import mongoose from 'mongoose';

const handleCastError = (err: mongoose.Error.CastError) => {
  const message = `Invalid ${err.path}:${err.value}`;

  return new AppError(httpStatus.BAD_REQUEST, message);
};

export default handleCastError;

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
