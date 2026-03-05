import express from 'express';
import {
  createService,
  getServicesByCategoriesAndCity,
} from './service.controller';

export const serviceRouter = express.Router();

serviceRouter.get('/', getServicesByCategoriesAndCity);
serviceRouter.post('/', protect, authorize('provider'), createService);
