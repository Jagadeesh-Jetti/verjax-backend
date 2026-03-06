import User from '../user/user.model.js';
import Provider from '../provider/provider.model.js';
import Booking from '../booking/booking.model.js';
import Service from '../service/service.model.js';

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'customer' });

    const totalProviders = await Provider.countDocuments();

    const approvedProviders = await Provider.countDocuments({
      approvalStatus: 'approved',
    });

    const pendingProviders = await Provider.countDocuments({
      approvalStatus: 'pending',
    });

    const totalServices = await Service.countDocuments({ isActive: true });

    const totalBookings = await Booking.countDocuments();

    const completedBookings = await Booking.countDocuments({
      status: 'completed',
    });

    const revenueData = await Booking.aggregate([
      {
        $match: { status: 'completed' },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$priceAtBooking' },
        },
      },
    ]);

    const totalRevenue =
      revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    res.json({
      totalUsers,
      totalProviders,
      approvedProviders,
      pendingProviders,
      totalServices,
      totalBookings,
      completedBookings,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'customer' }).select('passowrd');

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProviders = async (req, res) => {
  try {
    const providers = await Provider.find().populate(
      'userId',
      'name email phone'
    );

    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('serviceId', 'title price')
      .populate('customerId', 'name')
      .populate({
        path: 'providerId',
        populate: {
          path: 'userId',
          select: 'name',
        },
      });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
