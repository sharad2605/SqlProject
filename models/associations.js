
const User = require("./user");
const Bus = require("./buses");
const Booking = require("./booking");

// One user can have many bookings
User.hasMany(Booking, {
    foreignKey: "userId"
});
Booking.belongsTo(User, {
    foreignKey: "userId"
});

// One bus can have many bookings
Bus.hasMany(Booking, {
    foreignKey: "busId"
});
Booking.belongsTo(Bus, {
    foreignKey: "busId"
});

module.exports = { User, Bus, Booking };