import httpStatus from 'http-status';
import AppError from './appError';

const handleExpiredTokenError = () => {
  return new AppError(httpStatus.UNAUTHORIZED, 'Your token has expired!');
};

export default handleExpiredTokenError;
