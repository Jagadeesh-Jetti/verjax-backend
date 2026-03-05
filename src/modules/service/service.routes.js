import express from 'express';
import {
  createService,
  getServicesByCategoriesAndCity,
} from './service.controller.js';
import { protect } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';

export const serviceRouter = express.Router();

serviceRouter.get('/', getServicesByCategoriesAndCity);
serviceRouter.post('/', protect, authorize('provider'), createService);
