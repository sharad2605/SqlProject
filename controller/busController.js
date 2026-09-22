const db = require('../utils/db-connection');

const addBus = (req, res) => {

    const {
        busNumber,
        totalSeats,
        availableSeats
    } = req.body;

    const query = `
        INSERT INTO Buses
        (busNumber, totalSeats, availableSeats)
        VALUES (?, ?, ?)
    `;

    db.execute(
        query,
        [busNumber, totalSeats, availableSeats],
        (err, result) => {

            if (err) {
                console.error("Error adding bus:", err);
                res.status(500).send("Error adding bus");
                return;
            }

            console.log("Bus added successfully");

            res.status(201).send(
                `Bus added successfully with id ${result.insertId}`
            );
        }
    );
};


const getAvailableBuses = (req, res) => {

    const { seats } = req.params;

    const query = `
        SELECT *
        FROM Buses
        WHERE availableSeats > ?
    `;

    db.execute(query, [seats], (err, result) => {

        if (err) {
            console.error("Error fetching buses:", err);
            res.status(500).send("Error fetching buses");
            return;
        }

        console.log(
            `Buses with more than ${seats} available seats fetched`
        );

        res.status(200).json(result);
    });
};


module.exports = {
    addBus,
    getAvailableBuses
};