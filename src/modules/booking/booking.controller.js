import Service from '../service/service.model.js';
import Booking from '../booking/booking.model.js';

export const createBooking = async (req, res) => {
  try {
    const { serviceId, address, date, hoursBooked } = req.body;

    const service = await Service.findById(serviceId).populate('providerId');

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const totalPrice = hoursBooked * service.pricePerHour;

    const booking = await Booking.create({
      customerId: req.user.id,
      providerId: service.providerId._id,
      serviceId,
      city: service.providerId.city,
      address,
      date,
      hoursBooked,
      totalPrice,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
