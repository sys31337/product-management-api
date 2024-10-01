import { Document, PopulatedDoc, Types } from 'mongoose';
import { Category } from './category';

export interface Product extends Document {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category: Types.ObjectId | PopulatedDoc<Category>;
  status: "ACTIVE" | "DELETED";
}
