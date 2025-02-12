import { Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '@models/user';
import { WRONG_PASSWORD } from '@constants/users';
import RevokedTokens from '@models/tokens';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const createAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password: rawPassword, fullname } = req.body;
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(rawPassword, salt);
    const userPayload = {
      email, password, salt, fullname,
    };
    await new User(userPayload).save();
    return res.status(200).send({ email, fullname });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: { $regex: `^${email}$`, $options: 'i' } }).lean();
    if (!user) return res.sendStatus(404);
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send({ message: WRONG_PASSWORD });
    const { _id: userId, fullname, role } = user;
    const accessToken = jwt.sign({
      userId, fullname, email, role,
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({
      userId, fullname, email, role,
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
    const { password: _p, __v, ...usr } = user;
    return res.status(200).send({ ...usr, accessToken, refreshToken });
  } catch (error) {
    return next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Refresh ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
    const isRevoked = await RevokedTokens.findOne({ token });
    if (isRevoked) return res.sendStatus(401);
    return jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      async (err: unknown, dec) => {
        if (err) return res.sendStatus(401);
        const decoded = dec as jwt.JwtPayload;
        const user = await User.findById(decoded?.userId);
        if (!user) return res.sendStatus(401);
        const {
          _id: userId, fullname, email, role,
        } = user;
        const accessToken = jwt.sign({ userId, fullname, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const newRefreshToken = jwt.sign({ userId, fullname, email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
        return res.status(200).send({
          accessToken, refreshToken: newRefreshToken, email, role,
        });
      },
    );
  } catch (error) {
    return next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.cookies?.jwt) return res.sendStatus(401);
    const token = req.cookies.jwt;
    await new RevokedTokens({ token }).save();
    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};
