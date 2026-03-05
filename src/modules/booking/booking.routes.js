import express from 'express';
import { protect } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';
import { createBooking } from '../booking/booking.controller.js';

export const bookingRouter = express.Router();

bookingRouter.post('/', protect, authorize('customer'), createBooking);
