import express from 'express';
import { protect } from '../../middleware/auth.middleware.js';
import {
  approveProvider,
  createProvider,
  getMyProviderProfile,
  getProviderByCity,
  toggleAvailabilty,
} from './provider.controller.js';
import { authorize } from '../../middleware/role.middleware.js';
import { isProvider } from '../../middleware/provider.middleware.js';
// import { isProvider } from '../../middleware/provider.middlware.js';

export const providerRouter = express.Router();

providerRouter.post('/', protect, createProvider);
providerRouter.get('/me', protect, isProvider, getMyProviderProfile);
providerRouter.patch('/availability', protect, isProvider, toggleAvailabilty);
providerRouter.get('/city/:city', getProviderByCity);
providerRouter.patch(
  '/:id/approve',
  protect,
  authorize('admin'),
  approveProvider
);
