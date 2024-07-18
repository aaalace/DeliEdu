import { Request, Response, NextFunction } from 'express';

export class ControlError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ControlError';
  }
}

const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  if (err instanceof ControlError) {
    res.status(500).json({
      message: err.message || 'Internal server error'
    });
  }
  res.status(500).json({ message: 'Internal server error' });
};

export default errorHandlerMiddleware