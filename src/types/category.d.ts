import { Document, PopulatedDoc, Types } from 'mongoose';

export interface Category extends Document {
  name: string;
  description?: string;
  products: [Types.ObjectId | PopulatedDoc<Product>];
  status: "ACTIVE" | "DELETED";
}
