const db = require('../utils/db-connection');
const Student = require('../models/students');


// INSERT
const addEntries = async (req, res) => {
    try{
        const { name, email } = req.body;
        const student= await Student.create({
            email:email,
            name:name
        });

        res.status(201).send(`users with name   ${name} added successfully`);
    }catch(error){
            res.status(500).send('Error inserting data into the database');
    }
    

   
};


// UPDATE
const updateEntry = async (req, res) => {
    try{
    const { id } = req.params;
    const { name,} = req.body;

    const student = await Student.findByPk(id);
    if (!student) {
        return res.status(404).send(`Student  with id ${id} not found`);
    }
        student.name = name;
        await student.save();
        res.status(200).send(`Student with id ${id} updated successfully`);
    }catch(error){
        res.status(500).send('Error updating data in the database');
    }
};
// GET BY ID
const getEntryById = (req, res) => {

    const { id } = req.params;

    const getQuery = `
        SELECT * FROM students
        WHERE id = ?
    `;

    db.execute(getQuery, [id], (err, result) => {

        if (err) {
            console.error('Error fetching student:', err);

            res.status(500).send(
                'Error fetching student from database'
            );

            return;
        }

        if (result.length === 0) {
            res.status(404).send(
                `Student with id ${id} not found`
            );

            return;
        }

        res.status(200).json(result[0]);
    });
};
// GET ALL
const getEntries = (req, res) => {

    const getQuery = `
        SELECT * FROM students
    `;

    db.execute(getQuery, (err, result) => {

        if (err) {
            console.error('Error fetching data:', err);

            res.status(500).send(
                'Error fetching students from database'
            );

            return;
        }

        res.status(200).json(result);
    });
};

// DELETE
const deleteEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.destroy({
            where: { id: id }
        });

        if (!student) {
            return res.status(404).send(`Student with id ${id} not found`);
        }
        res.status(200).send(`Student with id ${id} deleted successfully`);
        
    }catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).send('Error deleting data from the database');
    }

    
};


module.exports = {
    addEntries,
    updateEntry,
    getEntryById,
    getEntries,
    deleteEntry
};