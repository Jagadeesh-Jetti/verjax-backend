import Service from '../service/service.model.js';
import Provider from '../user/provider.model.js';

export const createService = async (req, res) => {
  try {
    const { categoryId, pricePerHour, description } = req.body;

    const provider = await Provider.findOne({ userId: req.user.id });

    if (!provider || provider.approvalStatus !== 'approved') {
      return res.status(403).json({ message: 'Not an approved provider' });
    }

    const service = await Service.create({
      providerId: provider._id,
      categoryId,
      pricePerHour,
      description,
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
