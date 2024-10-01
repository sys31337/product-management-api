import { Router } from 'express';
import { create, getProducts, getProduct, hardDeleteProduct, softDeleteProduct, update } from '@controllers/products';
import { productIdValidator, createValidator, updateValidator } from '@validations/products';
import roleCheck from '@middlewares/roleCheck';
import auth from '@middlewares/auth';

const router = Router();

const isManagerOrAdmin = roleCheck(['ADMIN', 'MANAGER']);
const isAdmin = roleCheck(['ADMIN']);

router.route('/')
  .get(auth, getProducts)
  .post(auth, isManagerOrAdmin, createValidator, create);

router.route('/:id')
  .get(auth, productIdValidator, getProduct)
  .put(auth, isManagerOrAdmin, productIdValidator, updateValidator, update)
  .delete(auth, isAdmin, productIdValidator, softDeleteProduct);

router.delete('/:id/hard', auth, isAdmin, productIdValidator, hardDeleteProduct)

export default router;
