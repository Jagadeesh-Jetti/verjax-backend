import express from 'express';
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
  getMyServices,
} from './service.controller.js';
import { protect } from '../../middleware/auth.middleware.js';
import { isProvider } from '../../middleware/provider.middleware.js';

export const serviceRouter = express.Router();

serviceRouter.get('/', getServices);

serviceRouter.get('/:id', getServiceById);

serviceRouter.post('/', protect, isProvider, createService);

serviceRouter.patch('/:id', protect, isProvider, updateService);

serviceRouter.delete('/:id', protect, isProvider, deleteService);

serviceRouter.get('/me', protect, isProvider, getMyServices);
