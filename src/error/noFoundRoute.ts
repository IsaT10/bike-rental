import { Request, Response } from 'express';
import httpStatus from 'http-status';

export const notFoundRoute = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    succcess: false,
    statusCode: httpStatus.NOT_FOUND,
    message: `Not Found!`,
  });
};
