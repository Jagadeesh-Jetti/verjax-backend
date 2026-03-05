import express from 'express';
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from './category.controller.js';
import { protect } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';

export const categoryRouter = express.Router();

categoryRouter.get('/', getCategories);
categoryRouter.post('/', protect, authorize('admin'), createCategory);
categoryRouter.patch('/:id', protect, authorize('admin'), updateCategory);
categoryRouter.delete('/:id', protect, authorize('admin'), deleteCategory);
