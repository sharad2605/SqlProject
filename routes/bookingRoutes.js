
const express = require("express");
const router = express.Router();

const {
    createBooking,
    getUserBookings,
    getBusBookings
} = require("../controller/bookingController");

router.post("/", createBooking);
router.get("/users/:id/bookings", getUserBookings);
router.get("/buses/:id/bookings", getBusBookings);

module.exports = router;