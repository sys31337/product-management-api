import { Document, PopulatedDoc, Types } from 'mongoose';

export interface Category extends Document {
  name: string;
  description?: string;
  status: "ACTIVE" | "DELETED";
}
