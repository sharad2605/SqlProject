
const { User, Bus, Booking } = require("../models/associations");

exports.createBooking = async (req, res) => {
    try {
        const { userId, busId, seatNumber } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const bus = await Bus.findByPk(busId);
        if (!bus) {
            return res.status(404).json({ message: "Bus not found" });
        }

        const booking = await Booking.create({
            userId,
            busId,
            seatNumber
        });

        res.status(201).json({
            message: "Booking created successfully",
            booking
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating booking",
            error: error.message
        });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            where: { userId: req.params.id },
            include: [{
                model: Bus,
                attributes: ["busNumber"]
            }]
        });

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching user bookings",
            error: error.message
        });
    }
};

exports.getBusBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            where: { busId: req.params.id },
            include: [{
                model: User,
                attributes: ["name", "email"]
            }]
        });

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching bus bookings",
            error: error.message
        });
    }
};