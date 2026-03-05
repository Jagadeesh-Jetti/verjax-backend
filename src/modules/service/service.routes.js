import express from 'express';
import {
  createService,
  deleteService,
  getProviderServices,
  getServicesByCategoriesAndCity,
  updateService,
} from './service.controller.js';
import { protect } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';

export const serviceRouter = express.Router();

serviceRouter.get('/', getServicesByCategoriesAndCity);
serviceRouter.get('/my', protect, authorize('provider'), getProviderServices);
serviceRouter.post('/', protect, authorize('provider'), createService);
serviceRouter.put('/:id', protect, authorize('provider'), updateService);
serviceRouter.delete('/:id', protect, authorize('provider'), deleteService);
