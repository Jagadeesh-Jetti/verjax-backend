import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
      index: true,
    },

    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Provider',
      required: true,
      index: true,
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
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
      index: true,
    },

    notes: String,

    priceAtBooking: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ['requested', 'confirmed', 'in-progress', 'completed', 'cancelled'],
      default: 'requested',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
