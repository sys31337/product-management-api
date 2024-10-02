import { Schema, model } from 'mongoose';
import type { Category } from '@type/category';
import { ACTIVE, statusEnum } from '@constants/status';
import { requiredString } from './common';

const categorySchema = new Schema<Category>({
  name: requiredString,
  description: String,
  status: {
    type: String,
    enum: statusEnum,
    default: ACTIVE,
  },
}, { timestamps: true });

const Category = model<Category>('Category', categorySchema);
export default Category;
