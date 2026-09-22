const express = require('express');
const app = express();
const db= require('./utils/db-connection');
const studentRoutes = require('./routes/studentRoutes');
const userRoutes = require('./routes/userRoutes');
const busRoutes = require('./routes/busRoutes');

const Student = require('./models/students');

app.use(express.json());
app.use('/students', studentRoutes);

app.use('/users', userRoutes);
app.use('/buses', busRoutes);

db.sync({force: true}).then(() => {
  console.log('Database synchronized');
  app.listen(3000, () => {
  console.log('Server is running on port 3000');
  })
}).catch((error) => {
  console.error('Unable to synchronize the database:', error);
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
}



);

