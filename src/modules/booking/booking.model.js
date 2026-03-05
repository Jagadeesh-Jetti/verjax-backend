import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },

    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Provider',
      required: true,
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    bookingDate: {
      type: Date,
      required: true,
    },

    notes: String,

    priceAtBooking: Number,

    status: {
      type: String,
      enum: ['requested', 'confirmed', 'in-progress', 'completed', 'cancelled'],
      default: 'requested',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
