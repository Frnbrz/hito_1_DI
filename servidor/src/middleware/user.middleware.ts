import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export function middleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers.authorization
  const secret = process.env.JWT_SECRET || 'secret'
  const decodedToken = token ? jwt.verify(token, secret) : undefined
  if (decodedToken) {
    next()
  } else {
    res.status(401).json({ status: 'BAD_REQUEST', message: 'No token' })
  }
}
