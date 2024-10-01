import { Router } from 'express';
import { create, getCategories, getCategory, hardDeleteCategory, softDeleteCategory, update } from '@controllers/categories';
import { categoryIdValidator, createValidator, updateValidator } from '@validations/categories';
import roleCheck from '@middlewares/roleCheck';
import auth from '@middlewares/auth';

const router = Router();

const isManagerOrAdmin = roleCheck(['ADMIN', 'MANAGER']);
const isAdmin = roleCheck(['ADMIN']);

router.route('/')
  .get(auth, isManagerOrAdmin, getCategories)
  .post(auth, isManagerOrAdmin, createValidator, create);

router.route('/:id')
  .get(auth, categoryIdValidator, getCategory)
  .put(auth, isManagerOrAdmin, categoryIdValidator, updateValidator, update)
  .delete(auth, isAdmin, categoryIdValidator, softDeleteCategory);

router.delete('/:id/hard', auth, isAdmin, categoryIdValidator, hardDeleteCategory)

export default router;
