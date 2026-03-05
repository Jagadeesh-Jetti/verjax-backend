import Service from '../service/service.model.js';
import Provider from '../provider/provider.model.js';

export const createService = async (req, res) => {
  try {
    const { categoryId, title, description, hourlyPrice } = req.body;

    const provider = await Provider.findOne({ userId: req.user.id });

    if (!provider) {
      return res.status(404).json({ message: 'Provider profile not found' });
    }

    if (provider.approvalStatus !== 'approved') {
      return res.status(403).json({ message: 'Provider not approved yet' });
    }

    const service = await Service.create({
      providerId: provider._id,
      categoryId,
      title,
      description,
      hourlyPrice,
    });

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getServicesByCategoriesAndCity = async (req, res) => {
  try {
    const { categoryId, city } = req.query;

    const services = await Service.find({ categoryId, isActive: true })
      .populate({
        path: 'providerId',
        match: { city, approvalStatus: 'approved', availability: true },
      })
      .populate('categoryId');

    const filtered = services.filter((s) => s.providerId !== null);

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProviderServices = async (req, res) => {
  try {
    const provider = await Provider.findOne({ userId: req.user.id });

    const services = await Service.find({ providerId: provider._id });

    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
    });

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { returnDocument: 'after' }
    );

    res.json({ message: 'Service removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
