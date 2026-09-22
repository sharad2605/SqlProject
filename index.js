const express = require('express');
const app = express();
const db= require('./utils/db-connection');
const studentRoutes = require('./routes/studentRoutes');

app.use(express.json());
app.use('/students', studentRoutes);


app.get('/', (req, res) => {
  res.send('Hello, World!');
}



);
app.listen(3000, () => {
  console.log('Server is running on port 3000');
})
