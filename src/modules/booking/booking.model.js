import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Provider',
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    city: String,
    address: String,
    date: Date,
    hoursBooked: Number,
    totalPrice: Number,
    status: {
      type: String,
      enum: ['requested', 'confirmed', 'in-progress', 'completed', 'cancelled'],
      default: 'requested',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
