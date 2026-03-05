import express from 'express';
import {
  createService,
  getAllServices,
  getServicesByCity,
  getMyServices,
  deleteService,
} from './service.controller.js';
import { protect } from '../../middleware/auth.middleware.js';

export const serviceRouter = express.Router();

serviceRouter.get('/', protect, isProvider, getAllServices);

serviceRouter.get('/city/:city', getServicesByCity);

serviceRouter.post('/', protect, isProvider, createService);

serviceRouter.get('/me', protect, isProvider, getMyServices);

serviceRouter.delete('/:id', protect, isProvider, deleteService);
