import { ErrorRequestHandler } from 'express';
import handelZodError from '../error/handleZodError';
import handleValidationError from '../error/handleValidationError';
import handleCastError from '../error/handelCastError';
import handleDuplicateError from '../error/handleDuplicate';
import httpStatus from 'http-status';

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

  const { statusCode, message, stack } = error;

  const response: TResponse = {
    success: false,
    statusCode,
    message,
    stack,
  };

  // if (statusCode !== httpStatus.UNAUTHORIZED) {
  //   response.stack = stack;
  // }

  if (statusCode === httpStatus.NOT_FOUND) {
    response.data = [];
  }

  res.status(statusCode).json(response);

  // if (config.node_env === 'development') {
  //   res.status(statusCode).json({
  //     success: false,
  //     message: message,
  //     err,
  //     stack: stack || err.stack,
  //   });
  // }

  // if (config.node_env === 'production') {
  //   res.status(statusCode).json({
  //     success: false,
  //     message: message,
  //   });
  // }
};

export default globalErrorHandler;
