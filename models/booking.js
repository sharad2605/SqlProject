
const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connection");

const Booking = sequelize.define("booking", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    seatNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    busId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Booking;