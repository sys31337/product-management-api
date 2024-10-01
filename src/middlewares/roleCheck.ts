import { NextFunction, Response } from 'express';
import { AuthRequest, Role } from '@type/user';
import { ACCESS_DENIED } from '@constants/users';

const roleCheck = (roles: Role[]) => (req: AuthRequest, res: Response, next: NextFunction) => {
  const userRole = req.role;
  if (!roles.includes(userRole)) return res.status(403).json({ message: ACCESS_DENIED });
  next();
};

export default roleCheck;
