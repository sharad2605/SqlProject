const db = require('../utils/db-connection');

const addUser = (req, res) => {
    const { name, email } = req.body;

    const query = `
        INSERT INTO Users (name, email)
        VALUES (?, ?)
    `;

    db.execute(query, [name, email], (err, result) => {
        if (err) {
            console.error("Error adding user:", err);
            res.status(500).send("Error adding user");
            return;
        }

        console.log("User added successfully");

        res.status(201).send(
            `User added successfully with id ${result.insertId}`
        );
    });
};


const getUsers = (req, res) => {

    const query = `SELECT * FROM Users`;

    db.execute(query, (err, result) => {

        if (err) {
            console.error("Error fetching users:", err);
            res.status(500).send("Error fetching users");
            return;
        }

        console.log("Users fetched successfully");

        res.status(200).json(result);
    });
};


module.exports = {
    addUser,
    getUsers
};