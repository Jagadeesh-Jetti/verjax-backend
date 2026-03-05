import Category from './category.model.js';

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const exists = await Category.findOne({ name });

    if (exists) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = await Category.create({ name, description });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(id, req.body, {
      returnDocument: 'after',
    });

    if (!category) {
      return res.status(404).json({
        message: 'Category not found',
      });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(
      id,
      { isActive: false },
      { returnDocument: 'after' }
    );

    if (!category) {
      return res.status(404).json({
        message: 'Category not found',
      });
    }

    res.json({
      message: 'Category disabled successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
