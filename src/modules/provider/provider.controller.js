import Provider from '../provider/provider.model.js';
import User from '../user/user.model.js';

export const createProvider = async (req, res) => {
  try {
    const { bio, city, skills, experienceYears } = req.body;

    const userId = req.user.id;

    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const existingProvider = await Provider.findOne({ userId });

    if (existingProvider) {
      return res.status(400).json({
        message: 'Provider profile already exists',
      });
    }

    const provider = await Provider.create({
      userId,
      bio,
      city,
      skills,
      experienceYears,
    });

    res.status(201).json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyProviderProfile = async (req, res) => {
  try {
    const provider = await Provider.findOne({
      userId: req.user.id,
    }).populate('userId', 'name email phone');

    if (!provider) {
      return res.status(404).json({ message: 'Provider profile not found' });
    }
    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleAvailabilty = async (req, res) => {
  try {
    const provider = await Provider.findOne({ userId: req.user.id });

    if (!provider) {
      return res.status(404).json({
        message: 'Provider not found',
      });
    }

    if (provider.approvalStatus !== 'approved') {
      return res.status(403).json({
        message: 'Provider not approved yet',
      });
    }

    provider.availability = !provider.availability;

    await provider.save();

    res.json({
      message: 'Availability updated',
      availability: provider.availability,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveProvider = async (req, res) => {
  try {
    const { id } = req.params;

    const provider = await Provider.findByIdAndUpdate(
      id,
      { approvalStatus: 'approved' },
      { returnDocument: 'after' }
    );

    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    res.json({
      message: 'Provider approved',
      provider,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProviderByCity = async (req, res) => {
  try {
    const { city } = req.params;

    const providers = await Provider.find({
      city,
      approvalStatus: 'approved',
      availability: true,
    }).populate('userId', 'name');

    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
