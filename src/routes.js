import express from 'express';

import { authRouter } from './modules/auth/auth.routes.js';
import { categoryRouter } from './modules/category/category.routes.js';
import { serviceRouter } from './modules/service/service.routes.js';
import { bookingRouter } from './modules/booking/booking.routes.js';
import { providerRouter } from './modules/provider/provider.routes.js';
import { adminRouter } from './modules/admin/admin.routes.js';
import { reviewRouter } from './modules/review/review.routes.js';

export const router = express.Router();

router.use('/auth', authRouter);
router.use('/categories', categoryRouter);
router.use('/services', serviceRouter);
router.use('/bookings', bookingRouter);
router.use('/providers', providerRouter);
router.use('/reviews', reviewRouter);
router.use('/admin', adminRouter);
