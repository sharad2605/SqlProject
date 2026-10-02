const Users = require('../models/user');

// POST /users
const addUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await Users.create({
            name: name,
            email: email
        });

        res.status(201).send(
            `User with name ${name} added successfully`
        );

    } catch (error) {
        console.error('Error inserting user:', error);

        res.status(500).send(
            'Error inserting user into the database'
        );
    }
};


// GET /users
const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll();

        res.status(200).json(users);

    } catch (error) {
        console.error('Error fetching users:', error);

        res.status(500).send(
            'Error fetching users from the database'
        );
    }
};


module.exports = {
    addUser,
    getUsers
};