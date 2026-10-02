const Buses = require('../models/buses');
const { Op } = require('sequelize');

// POST /buses
const addBus = async (req, res) => {
    try {
        const {
            busNumber,
            totalSeats,
            availableSeats
        } = req.body;

        const bus = await Buses.create({
            busNumber: busNumber,
            totalSeats: totalSeats,
            availableSeats: availableSeats
        });

        res.status(201).send(
            `Bus with number ${busNumber} added successfully`
        );

    } catch (error) {
        console.error('Error inserting bus:', error);

        res.status(500).send(
            'Error inserting bus into the database'
        );
    }
};


// GET /buses/available/:seats
const getAvailableBuses = async (req, res) => {
    try {
        const { seats } = req.params;

        const buses = await Buses.findAll({
            where: {
                availableSeats: {
                    [Op.gt]: seats
                }
            }
        });

        res.status(200).json(buses);

    } catch (error) {
        console.error('Error fetching buses:', error);

        res.status(500).send(
            'Error fetching buses from the database'
        );
    }
};


module.exports = {
    addBus,
    getAvailableBuses
};