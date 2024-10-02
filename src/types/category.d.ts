import { Document } from 'mongoose';

export interface Category extends Document {
  name: string;
  description?: string;
  status: 'ACTIVE' | 'DELETED';
}
