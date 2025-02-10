import { Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '@models/user';
import { WRONG_PASSWORD } from '@constants/users';
import RevokedTokens from '@models/tokens';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const cookiesOptions = {
  httpOnly: true,
  secure: true,
  maxAge: 24 * 60 * 60 * 1000,
};

export const createAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password: rawPassword } = req.body;
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(rawPassword, salt);
    const userPayload = { email, password, salt };
    const user = await new User(userPayload).save();
    return res.status(200).send(user);
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
    const { _id: userId, fullname } = user;
    const accessToken = jwt.sign({ userId, fullname, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId, fullname, email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
    res.cookie('jwt', refreshToken, cookiesOptions);
    const { password: _p, __v, ...usr } = user;
    return res.status(200).send({ ...usr, accessToken });
  } catch (error) {
    return next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  try {
    if (!req.cookies?.jwt) return res.sendStatus(401);
    const token = req.cookies.jwt;
    const isRevoked = await RevokedTokens.findOne({ token });
    if (isRevoked) return res.sendStatus(401);
    return jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      async (err: unknown, decoded) => {
        if (err) return res.sendStatus(401);
        const user = await User.findById(decoded.userId);
        if (!user) return res.sendStatus(401);
        const { _id: userId, fullname, email } = user;
        const accessToken = jwt.sign({ userId, fullname, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        return res.status(200).send({ accessToken });
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
