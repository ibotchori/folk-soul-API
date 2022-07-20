/* Custom error handler */
import { Request, Response, NextFunction } from 'express'
// Overwrite default express error handler
export const errorHandler = (
  err: TypeError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if status code is set, take that. if not, set it to 500
  const statusCode = res.statusCode ? res.statusCode : 500

  res.status(statusCode)
  res.json({
    message: err.message,
    // stack gives some additional information. show the stack information only in developer mode
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}
