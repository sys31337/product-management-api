import express from 'express';
import { createAccount, login, logout, refreshToken } from '@controllers/users';
import { loginValidator, registerValidator } from '@validations/users';

const router = express.Router();

router.post('/', registerValidator, createAccount);
router.post('/auth', loginValidator, login);
router.post('/refresh', refreshToken);
router.post('/logout', logout);

export default router;
