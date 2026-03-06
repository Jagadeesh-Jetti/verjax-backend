import Provider from '../modules/provider/provider.model.js';

export const isProvider = async (req, res, next) => {
  try {
    const provider = await Provider.findOne({ userId: req.user.id });

    if (!provider) {
      return res
        .status(403)
        .json({ message: 'Only providers can perform this action' });
    }

    if (provider.approvalStatus !== 'approved') {
      return res.status(403).json({
        message: 'Provider not approved by admin yet',
      });
    }

    req.provider = provider;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
