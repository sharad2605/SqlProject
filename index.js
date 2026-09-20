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
        CREATE TABLE IF NOT EXISTS Students (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE
        )
    `;

    connection.execute(createTableQuery, (err) => { 
            if (err) {
                console.error('Error creating table:', err);
                return;
            }

            console.log('Table created successfully');
});

})
app.get('/', (req, res) => {
  res.send('Hello, World!');
}

);
app.listen(3000, () => {
  console.log('Server is running on port 3000');
})
