import express from 'express';
import { authRouter } from './modules/auth/auth.routes.js';
import { categoryRouter } from './modules/category/category.routes.js';
import { serviceRouter } from './modules/service/service.routes.js';
import { bookingRouter } from './modules/booking/booking.routes.js';

export const router = express.Router();

router.use('/auth', authRouter);
router.use('/categories', categoryRouter);
router.use('/services', serviceRouter);
router.use('/booking', bookingRouter);
