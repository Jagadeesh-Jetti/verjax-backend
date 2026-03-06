import express from 'express';
import { protect } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';

import {
  createBooking,
  getMyBookings,
  getProviderBookings,
  updateBookingStatus,
  cancelBooking,
  getProviderEarnings,
  getProviderDashboardStats,
} from './booking.controller.js';
import { isProvider } from '../../middleware/provider.middleware.js';

export const bookingRouter = express.Router();

bookingRouter.post('/', protect, authorize('customer'), createBooking);

bookingRouter.get('/my', protect, authorize('customer'), getMyBookings);

bookingRouter.patch(
  '/:id/cancel',
  protect,
  authorize('customer'),
  cancelBooking
);

bookingRouter.get('/provider', protect, isProvider, getProviderBookings);

bookingRouter.patch('/status/:id', protect, isProvider, updateBookingStatus);

bookingRouter.get(
  '/provider/earnings',
  protect,
  isProvider,
  getProviderEarnings
);

bookingRouter.get(
  '/provider/dashboard',
  protect,
  isProvider,
  getProviderDashboardStats
);
