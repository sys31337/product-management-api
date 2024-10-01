import express from 'express';
import auth from '@middlewares/auth';
import { createAccount, login, refreshToken } from '@controllers/users';
import { loginValidator, registerValidator } from '@validations/users';

const router = express.Router();

router.route('/')
  .post(registerValidator, createAccount);

router.post('/auth', loginValidator, login)
router.post('/refresh', refreshToken)

export default router;
