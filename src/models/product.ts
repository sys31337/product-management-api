import { Schema, model } from 'mongoose';
import type { Product } from '@type/product';
import { requiredString } from './common';
import { ACTIVE, statusEnum } from '@constants/status';

const productSchema = new Schema<Product>({
  name: requiredString,
  description: String,
  price: Number,
  quantity: Number,
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  status: {
    type: String,
    enum: statusEnum,
    default: ACTIVE,
  }
}, { timestamps: true });

const Product = model<Product>('Product', productSchema);
export default Product;
