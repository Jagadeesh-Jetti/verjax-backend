import express from 'express';
import {
  createReview,
  getProviderRating,
  getProviderReviews,
  getServiceReviews,
} from './review.controller.js';

import { protect } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';

export const reviewRouter = express.Router();

reviewRouter.post('/', protect, authorize('customer'), createReview);

reviewRouter.get('/service/:serviceId', getServiceReviews);

reviewRouter.get('/provider/:providerId', getProviderReviews);

reviewRouter.get('/provider/:providerId/rating', getProviderRating);
