import express from 'express';

export const bookingRouter = express.Router();

bookingRouter.post('/', protect, authorize('customer'), createBooking);
