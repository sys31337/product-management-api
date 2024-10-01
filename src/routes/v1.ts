import express from 'express';
import usersRouter from './helpers/users';
// import productsRouter from './helpers/products';
// import categoriesRouter from './helpers/categories';

const router = express.Router();

router.use('/users', usersRouter);
// router.use('/products', productsRouter);
// router.use('/categories', categoriesRouter);

export default router;
