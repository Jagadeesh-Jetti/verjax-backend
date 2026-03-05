import serviceCategoryModel from './category.model';

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const skills = await serviceCategoryModel.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = await serviceCategoryModel.create({ name, description });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await serviceCategoryModel.find({ isActive: true });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
