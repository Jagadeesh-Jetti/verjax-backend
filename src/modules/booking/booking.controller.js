import mongoose from 'mongoose';
import Booking from './booking.model.js';
import Service from '../service/service.model.js';

const validTransitions = {
  requested: ['confirmed', 'cancelled'],
  confirmed: ['in-progress', 'cancelled'],
  'in-progress': ['completed'],
  completed: [],
  cancelled: [],
};

export const createBooking = async (req, res) => {
  try {
    const { serviceId, address, city, bookingDate, notes } = req.body;

    const service = await Service.findById(serviceId);

    if (!service || !service.isActive) {
      return res.status(404).json({ message: 'Service not available' });
    }

    const booking = await Booking.create({
      serviceId,
      providerId: service.providerId,
      customerId: req.user.id,
      address,
      city,
      bookingDate,
      notes,
      priceAtBooking: service.price,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      customerId: req.user.id,
    })
      .populate('serviceId', 'title price')
      .populate('providerId');

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProviderBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      providerId: req.provider._id,
    })
      .populate('customerId', 'name phone')
      .populate('serviceId', 'title price');

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.providerId.toString() !== req.provider._id.toString()) {
      return res.status(403).json({
        message: 'Not authorized to update this booking',
      });
    }

    const currentStatus = booking.status;

    const allowed = validTransitions[currentStatus];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        message: `Invalid transition from ${currentStatus} to ${status}`,
      });
    }

    booking.status = status;
    await booking.save();

    res.json({
      message: 'Booking status updated',
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.customerId.toString() !== req.user.id) {
      return res.status(403).json({
        message: 'Not authorized to cancel this booking',
      });
    }

    if (booking.status !== 'requested' && booking.status !== 'confirmed') {
      return res.status(400).json({
        message: 'Booking cannot be cancelled at this stage',
      });
    }

    booking.status = 'cancelled';

    await booking.save();

    res.json({ message: 'Booking cancelled' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProviderEarnings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      providerId: req.provider._id,
      status: 'completed',
    })
      .populate('serviceId', 'title')
      .populate('customerId', 'name');

    const totalEarnings = bookings.reduce(
      (sum, booking) => sum + booking.priceAtBooking,
      0
    );

    res.json({
      totalEarnings,
      completedBookings: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProviderDashboardStats = async (req, res) => {
  try {
    const providerId = req.provider._id;

    const totalBookings = await Booking.countDocuments({ providerId });

    const completedJobs = await Booking.countDocuments({
      providerId,
      status: 'completed',
    });

    const pendingJobs = await Booking.countDocuments({
      providerId,
      status: { $in: ['requested', 'confirmed', 'in-progress'] },
    });

    const earningsData = await Booking.aggregate([
      {
        $match: {
          providerId: new mongoose.Types.ObjectId(providerId),
          status: 'completed',
        },
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: '$priceAtBooking' },
        },
      },
    ]);

    const totalEarnings =
      earningsData.length > 0 ? earningsData[0].totalEarnings : 0;

    res.json({
      totalBookings,
      completedJobs,
      pendingJobs,
      totalEarnings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
