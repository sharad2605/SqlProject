const express = require('express');
const app = express();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'testdb'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    return;
    }



    
    console.log('Connected to the database');
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE
    )
`;

connection.execute(createTableQuery, (err) => {
    if (err) {
        console.error('Error creating Users table:', err);
        return;
    }

    console.log('Users table created successfully');
});

const createTableBusesQuery = `
    CREATE TABLE IF NOT EXISTS Buses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        busNumber VARCHAR(255) NOT NULL,
        totalSeats VARCHAR(255) NOT NULL UNIQUE,
        availableSeats VARCHAR(255) NOT NULL UNIQUE
    )
`;

connection.execute(createTableBusesQuery, (err) => {
    if (err) {
        console.error('Error creating Buses table:', err);
        return;
    }

    console.log('Buses table created successfully');
});
const createTableBookingQuery = `
    CREATE TABLE IF NOT EXISTS Bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        seatNumber VARCHAR(255) NOT NULL
    )
`;

connection.execute(createTableBookingQuery, (err) => {
    if (err) {
        console.error('Error creating Bookings table:', err);
        return;
    }

    console.log('Bookings table created successfully');
});
const createTablePaymentQuery = `
    CREATE TABLE IF NOT EXISTS Payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        amountPaid DECIMAL(10, 2) NOT NULL,
        paymentStatus VARCHAR(255) NOT NULL UNIQUE
    )
`;

connection.execute(createTablePaymentQuery, (err) => {
    if (err) {
        console.error('Error creating Payment table:', err);
        return;
    }

    console.log('Payment table created successfully');
});

})
app.get('/', (req, res) => {
  res.send('Hello, World!');
}

);
app.listen(3000, () => {
  console.log('Server is running on port 3000');
})
