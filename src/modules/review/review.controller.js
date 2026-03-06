import mongoose from 'mongoose';
import Review from './review.model.js';
import Booking from '../booking/booking.model.js';

export const createReview = async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.customerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not your booking' });
    }

    if (booking.status !== 'completed') {
      return res.status(400).json({
        message: 'Review allowed only after service completion',
      });
    }

    const review = await Review.create({
      bookingId,
      serviceId: booking.serviceId,
      providerId: booking.providerId,
      customerId: req.user.id,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getServiceReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      serviceId: req.params.serviceId,
    }).populate('customerId', 'name');

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProviderReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      providerId: req.params.providerId,
    }).populate('customerId', 'name');

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProviderRating = async (req, res) => {
  try {
    const providerId = req.params.providerId;

    const stats = await Review.aggregate([
      {
        $match: {
          providerId: new mongoose.Types.ObjectId(providerId),
        },
      },
      {
        $group: {
          _id: '$providerId',
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    if (!stats.length) {
      return res.json({
        averageRating: 0,
        totalReviews: 0,
      });
    }

    res.json({
      averageRating: Number(stats[0].averageRating.toFixed(1)),
      totalReviews: stats[0].totalReviews,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
