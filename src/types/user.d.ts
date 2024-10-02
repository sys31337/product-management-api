import { Request } from "express";

export type Role = "ADMIN" | "MANAGER" | "CLIENT";

export interface AuthRequest extends Request {
  userId?: string;
  email?: string;
  role?: Role;
  isTest?: boolean;
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
