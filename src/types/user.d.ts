import { Request } from "express";

export interface AuthRequest extends Request {
  userId?: string;
  email?: string;
  isAdmin?: boolean;
  role?: number;
}

export interface User extends Document {
  fullname?: string;
  avatar?: string;
  email: string;
  password: string;
  salt: string;
  role: "CLIENT" | "MANAGER" | "ADMIN";
  resetPasswordUid: string;
  resetPasswordExpiresAt: Date;
  __v: number;
}
