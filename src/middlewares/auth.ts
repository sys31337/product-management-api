import { NextFunction, Response } from 'express';
import User from '@models/user';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '@type/user';

const auth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.sendStatus(401); return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      res.sendStatus(401); return;
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as { [key: string]: string };
    req.email = decoded.email;
    req.userId = decoded.userId;
    const user = await User.findById(decoded.userId);
    if (!user) {
      res.sendStatus(404); return;
    }
    req.isAdmin = user.role > 1;
    return next();
  } catch (error) {
    return next(error);
  }
};


export default auth;
