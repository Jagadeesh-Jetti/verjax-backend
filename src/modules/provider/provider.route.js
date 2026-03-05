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

export const providerRouter = express.Router();

providerRouter.post('/', protect, createProvider);
providerRouter.get('/me', protect, getMyProviderProfile);
providerRouter.patch('/availability', protect, toggleAvailabilty);
providerRouter.get('/city/:city', getProviderByCity);
providerRouter.patch('/:id', protect, authorize('admin'), approveProvider);
