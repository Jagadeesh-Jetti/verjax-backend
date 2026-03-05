import express from 'express';
import { createCategory, getCategories } from './category.controller';

export const categoryRouter = express.Router();

categoryRouter.get('/'.getCategories);
categoryRouter.post('/', protect, authorize('admin'), createCategory);
