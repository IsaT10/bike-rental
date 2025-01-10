import { Response } from 'express';

type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

type TResponse<T> = {
  success: boolean;
  statusCode: number;
  data: T;
  token?: string;
  meta?: TMeta;
  message?: string;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    token: data.token,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};

export default sendResponse;
