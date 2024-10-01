import { Schema, model } from 'mongoose';
import type { User } from '@type/user';
import { ADMIN, CLIENT, MANAGER } from '@constants/users';
import { requiredString } from './common';

const userSchema = new Schema<User>({
  fullname: String,
  avatar: String,
  email: { ...requiredString, unique: true },
  password: requiredString,
  salt: requiredString,
  role: {
    type: String,
    default: CLIENT,
    enum: [CLIENT, MANAGER, ADMIN],
  },
  resetPasswordUid: String,
  resetPasswordExpiresAt: Date,
}, { timestamps: true });

const User = model<User>('User', userSchema);
export default User;
