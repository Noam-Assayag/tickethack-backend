require('dotenv').config();
const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI;

console.log("Mongo URI:", connectionString);

mongoose.connect(connectionString)
  .then(() => console.log('Database connected'))
  .catch(error => console.error('Mongo error:', error));