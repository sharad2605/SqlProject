const db = require('../utils/db-connection');


// INSERT
const addEntries = (req, res) => {
    const { name, email } = req.body;

    const insertQuery = `
        INSERT INTO students (name, email)
        VALUES (?, ?)
    `;

    db.execute(insertQuery, [name, email], (err, result) => {

        if (err) {
            console.error('Error inserting data:', err);

            res.status(500).send(
                'Error inserting data into the database'
            );

            return;
        }

        console.log(
            `INSERT: Student added successfully with id ${result.insertId}`
        );

        res.status(200).send(
            `Student with name ${name} added successfully`
        );
    });
};


// UPDATE
const updateEntry = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    const updateQuery = `
        UPDATE students
        SET name = ?, email = ?
        WHERE id = ?
    `;

    db.execute(
        updateQuery,
        [name, email, id],
        (err, result) => {
            console.log("id:", id);
console.log("name:", name);
console.log("email:", email);

            if (err) {
                console.error('Error updating data:', err);

                res.status(500).send(
                    'Error updating data in the database'
                );

                return;
            }

            if (result.affectedRows === 0) {
                console.log(
                    `UPDATE: Student with id ${id} not found`
                );

                res.status(404).send(
                    `Student with id ${id} not found`
                );

                return;
            }

            console.log(
                `UPDATE: Student with id ${id} updated successfully`
            );

            res.status(200).send(
                `Student with id ${id} updated successfully`
            );
        }
    );
};


// DELETE
const deleteEntry = (req, res) => {
    const { id } = req.params;

    const deleteQuery = `
        DELETE FROM students
        WHERE id = ?
    `;

    db.execute(
        deleteQuery,
        [id],
        (err, result) => {

            if (err) {
                console.error('Error deleting data:', err);

                res.status(500).send(
                    'Error deleting data from the database'
                );

                return;
            }

            if (result.affectedRows === 0) {
                console.log(
                    `DELETE: Student with id ${id} not found`
                );

                res.status(404).send(
                    `Student with id ${id} not found`
                );

                return;
            }

            console.log(
                `DELETE: Student with id ${id} deleted successfully`
            );

            res.status(200).send(
                `Student with id ${id} deleted successfully`
            );
        }
    );
};


module.exports = {
    addEntries,
    updateEntry,
    deleteEntry
};