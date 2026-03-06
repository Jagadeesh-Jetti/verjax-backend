import express from 'express';
import { protect } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';

import {
  getAdminStats,
  getAllBookings,
  getAllProviders,
} from './admin.controller.js';

export const adminRouter = express.Router();

adminRouter.get('/stats', protect, authorize('admin'), getAdminStats);

adminRouter.get('/providers', protect, authorize('admin'), getAllProviders);

adminRouter.get('/bookings', protect, authorize('admin'), getAllBookings);
