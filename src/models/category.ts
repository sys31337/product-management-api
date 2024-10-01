import { Schema, model } from 'mongoose';
import type { Category } from '@type/category';
import { requiredString } from './common';
import { ACTIVE, statusEnum } from '@constants/status';

const categorySchema = new Schema<Category>({
  name: requiredString,
  description: String,
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
  }],
  status: {
    type: String,
    enum: statusEnum,
    default: ACTIVE,
  }
}, { timestamps: true });

const Category = model<Category>('Category', categorySchema);
export default Category;
