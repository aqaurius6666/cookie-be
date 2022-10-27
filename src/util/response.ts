import { Response } from 'express';

export const response200 = (res: Response, data: any) => {
  res.status(200).json({
    success: true,
    status: 200,
    data,
  });
};

export const response400 = (res: Response, data: any) => {
  res.status(200).json({
    success: false,
    status: 400,
    message: data,
  });
};

export const response401 = (res: Response, data: any) => {
  res.status(200).json({
    success: false,
    status: 401,
    message: data,
  });
};

export const response500 = (res: Response, data: any) => {
  res.status(200).json({
    success: false,
    status: 500,
    message: data,
  });
};
