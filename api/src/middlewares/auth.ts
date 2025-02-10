import { NextFunction, Response } from 'express';
import User from '@models/user';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '@type/user';

const auth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    if (process.env.NODE_ENV === 'test') {
      req.role = 'ADMIN';
      req.isTest = true;
      return next();
    }
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as { [key: string]: string };
    req.email = decoded.email;
    req.userId = decoded.userId;
    const user = await User.findById(decoded.userId);
    if (!user) return res.sendStatus(404);
    req.role = user.role;
    return next();
  } catch (error) {
    return next(error);
  }
};

export default auth;
