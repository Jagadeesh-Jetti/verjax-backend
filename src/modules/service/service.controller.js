import Service from '../service/service.model.js';
import Provider from '../provider/provider.model.js';
import Category from '../category/category.model.js';

export const createService = async (req, res) => {
  try {
    const { title, description, price, duration, categoryId, city } = req.body;

    const provider = await Provider.findOne({ userId: req.user.id });

    if (!provider) {
      return res.status(404).json({
        message: 'Provider profile not found',
      });
    }

    if (provider.approvalStatus !== 'approved') {
      return res.status(403).json({
        message: 'Provider not approved yet',
      });
    }

    const category = await Category.findById(categoryId);

    if (!category || !category.isActive) {
      return res.status(404).json({
        message: 'Category not found',
      });
    }

    const service = await Service.create({
      title,
      description,
      price,
      duration,
      categoryId,
      city,
      providerId: provider._id,
    });

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getServices = async (req, res) => {
  try {
    const { city, category } = req.query;

    let filter = { isActive: true };

    if (city) filter.city = city;
    if (category) filter.categoryId = category;

    const services = await Service.find(filter)
      .populate('providerId', 'bio city')
      .populate('categoryId', 'name');

    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('providerId', 'bio city')
      .populate('categoryId', 'name');

    if (!service) {
      return res.status(404).json({
        message: 'Service not found',
      });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: 'Service not found',
      });
    }

    const provider = await Provider.findOne({ userId: req.user.id });

    if (
      !provider ||
      service.providerId.toString() !== provider._id.toString()
    ) {
      return res.status(403).json({
        message: 'Not authorized to update this service',
      });
    }

    Object.assign(service, req.body);

    await service.save();

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: 'Service not found',
      });
    }

    const provider = await Provider.findOne({ userId: req.user.id });

    if (
      !provider ||
      service.providerId.toString() !== provider._id.toString()
    ) {
      return res.status(403).json({
        message: 'Not authorized to delete this service',
      });
    }

    service.isActive = false;

    await service.save();

    res.json({
      message: 'Service removed',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyServices = async (req, res) => {
  try {
    const services = await Service.find({
      providerId: req.provider._id,
    });

    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
