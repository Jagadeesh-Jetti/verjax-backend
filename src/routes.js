import express from 'express';
import { authRouter } from './modules/auth/auth.routes.js';

export const router = express.Router();

router.use('/auth', authRouter);
