import { Response } from 'express';

type TResponse<T> = {
  success: boolean;
  statusCode: number;
  data: T;
  token?: string;
  message?: string;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    token: data.token,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
